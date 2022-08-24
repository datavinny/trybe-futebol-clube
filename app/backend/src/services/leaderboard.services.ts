import * as sequelize from 'sequelize';
import MatchModel from '../database/models/match';
import TeamModel from '../database/models/team';
import ILeaderboard from '../utils/interfaces/leaderboard.interface';

class LeaderboardService {
  constructor(
    private _matchModel = MatchModel,
    private _teamModel = TeamModel,
  ) { }

  public async homeLeaderboard(queries: any): Promise<ILeaderboard[]> {
    const data = await this._matchModel.findAll({ where: { inProgress: false },
      attributes: [[sequelize.literal(queries.totalGames), 'totalGames'],
        [sequelize.literal(queries.goalsFavor), 'goalsFavor'],
        [sequelize.literal(queries.goalsOwn), 'goalsOwn'],
        [sequelize.literal('SUM(IF(home_team_goals>away_team_goals, 1, 0))'), 'totalVictories'],
        [sequelize.literal('SUM(IF(home_team_goals<away_team_goals, 1, 0))'), 'totalLosses'],
        [sequelize.literal('SUM(IF(home_team_goals=away_team_goals, 1, 0))'), 'totalDraws'],
        [sequelize.literal(queries.totalPoints), 'totalPoints'],
        [sequelize.literal(queries.efficiency), 'efficiency'],
        [sequelize.literal(queries.goalsBalance), 'goalsBalance'],
      ],
      include: [{ model: this._teamModel, attributes: ['teamName'], as: 'teamHome' }],
      group: ['Match.home_team'],
      order: [sequelize.literal(queries.order)],
      raw: true,
      nest: true });
    return data as unknown as ILeaderboard[];
  }

  public async getHomeLeaderboard(): Promise<ILeaderboard[]> {
    const totalGames = 'COUNT(home_team)';
    const goalsFavor = 'SUM(home_team_goals)';
    const goalsOwn = 'SUM(away_team_goals)';
    const totalPoints = (`((SUM(IF(home_team_goals>away_team_goals,1,0)))*3)
      +SUM(IF(home_team_goals=away_team_goals,1,0))`);
    const efficiency = `ROUND(((${totalPoints})/(${totalGames}*3))*100,2)`;
    const goalsBalance = `${goalsFavor}-${goalsOwn}`;
    const order = (`totalPoints DESC, totalVictories DESC, goalsBalance DESC, 
    goalsFavor DESC, goalsOwn DESC`);
    const result = await this.homeLeaderboard({ totalGames,
      goalsFavor,
      goalsOwn,
      totalPoints,
      efficiency,
      goalsBalance,
      order });
    return result.map(({ teamHome, ...rest }) => ({ name: teamHome?.teamName, ...rest }));
  }
}

export default LeaderboardService;
