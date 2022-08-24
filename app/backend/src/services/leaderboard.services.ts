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
      attributes: [[sequelize.fn('COUNT', sequelize.col('home_team')), 'totalGames'],
        [sequelize.fn('SUM', sequelize.col('home_team_goals')), 'goalsFavor'],
        [sequelize.fn('SUM', sequelize.col('away_team_goals')), 'goalsOwn'],
        [sequelize.literal('SUM(IF(home_team_goals>away_team_goals, 1, 0))'), 'totalVictories'],
        [sequelize.literal('SUM(IF(home_team_goals<away_team_goals, 1, 0))'), 'totalLosses'],
        [sequelize.literal('SUM(IF(home_team_goals=away_team_goals, 1, 0))'), 'totalDraws'],
        [sequelize.literal(queries.totalPoints), 'totalPoints'],
        [sequelize.literal(queries.efficiency), 'efficiency'],
        [sequelize.literal('SUM(home_team_goals)-SUM(away_team_goals)'), 'goalsBalance'],
      ],
      include: [{ model: this._teamModel, attributes: ['teamName'], as: 'teamHome' }],
      group: ['Match.home_team'],
      order: [sequelize.literal(queries.orderBy)],
      raw: true,
      nest: true });
    return data as unknown as ILeaderboard[];
  }

  public async getHomeLeaderboard(): Promise<ILeaderboard[]> {
    const totalPoints = (
      `((SUM(IF(home_team_goals>away_team_goals,1,0)))*3)
      +SUM(IF(home_team_goals=away_team_goals,1,0))`
    );
    const efficiency = (
      `(SUM(IF(home_team_goals>away_team_goals, 1, 0))*3)
      +SUM(IF(home_team_goals=away_team_goals, 1, 0))/(COUNT(home_team)*3)*100`
    );
    const orderBy = (
      `totalPoints DESC, goalsFavor DESC, goalsFavor DESC,
      goalsBalance DESC, goalsFavor DESC, goalsOwn DESC`);
    const queries = { totalPoints, efficiency, orderBy };
    const result = await this.homeLeaderboard(queries);
    return result as unknown as ILeaderboard[];
  }
}

export default LeaderboardService;
