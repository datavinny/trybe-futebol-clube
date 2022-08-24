import * as sequelize from 'sequelize';
import MatchModel from '../database/models/match';
import TeamModel from '../database/models/team';
import ILeaderboard from '../utils/interfaces/leaderboard.interface';

class LeaderboardService {
  constructor(
    private _matchModel = MatchModel,
    private _teamModel = TeamModel,
  ) { }

  public async leaderboard(queries: any): Promise<ILeaderboard[]> {
    const data = await this._matchModel.findAll({ where: { inProgress: false },
      attributes: [[sequelize.literal(queries.j), 'totalGames'],
        [sequelize.literal(queries.gp), 'goalsFavor'],
        [sequelize.literal(queries.gc), 'goalsOwn'],
        [sequelize.literal(queries.v), 'totalVictories'],
        [sequelize.literal(queries.d), 'totalLosses'],
        [sequelize.literal(queries.e), 'totalDraws'],
        [sequelize.literal(queries.p), 'totalPoints'],
        [sequelize.literal(queries.eff), 'efficiency'],
        [sequelize.literal(queries.sg), 'goalsBalance'],
      ],
      include: [{ model: this._teamModel, attributes: ['teamName'], as: `${queries.as}` }],
      group: [queries.group],
      order: [sequelize.literal(`totalPoints DESC, totalVictories DESC, goalsBalance DESC, 
      goalsFavor DESC, goalsOwn DESC`)],
      raw: true,
      nest: true });
    return data as unknown as ILeaderboard[];
  }

  public async getHomeLeaderboard(): Promise<ILeaderboard[]> {
    const j = 'COUNT(home_team)';
    const gp = 'SUM(home_team_goals)';
    const gc = 'SUM(away_team_goals)';
    const v = 'SUM(IF(home_team_goals>away_team_goals, 1, 0))';
    const d = 'SUM(IF(home_team_goals<away_team_goals, 1, 0))';
    const e = 'SUM(IF(home_team_goals=away_team_goals, 1, 0))';
    const p = (`((${v})*3)+${e}`);
    const eff = `ROUND(((${p})/(${j}*3))*100,2)`;
    const sg = `${gp}-${gc}`;
    const group = 'Match.home_team';
    const as = 'teamHome';
    const data = await this.leaderboard({ j, gp, gc, p, eff, sg, v, d, e, group, as });
    return data.map(({ teamHome, ...rest }) => ({ name: teamHome?.teamName, ...rest }));
  }

  public async getAwayLeaderboard(): Promise<ILeaderboard[]> {
    const j = 'COUNT(away_team)';
    const gp = 'SUM(away_team_goals)';
    const gc = 'SUM(home_team_goals)';
    const v = 'SUM(IF(away_team_goals>home_team_goals, 1, 0))';
    const d = 'SUM(IF(away_team_goals<home_team_goals, 1, 0))';
    const e = 'SUM(IF(away_team_goals=home_team_goals, 1, 0))';
    const p = (`((${v})*3)+${e}`);
    const eff = `ROUND(((${p})/(${j}*3))*100,2)`;
    const sg = `${gp}-${gc}`;
    const group = 'Match.away_team';
    const as = 'teamAway';
    const data = await this.leaderboard({ j, gp, gc, p, eff, sg, v, d, e, group, as });
    return data.map(({ teamAway, ...rest }) => ({ name: teamAway?.teamName, ...rest }));
  }
}

export default LeaderboardService;
