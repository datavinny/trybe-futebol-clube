import IMatch from '../utils/interfaces/match.interface';
import MatchModel from '../database/models/match';
import TeamModel from '../database/models/team';
import TeamService from './team.services';

class MatchesService {
  constructor(
    private _model = MatchModel,
    private _teamService = new TeamService(),
  ) { }

  public async getAll(query: { inProgress: string }): Promise<IMatch[]> {
    let value = {};
    if (query && query.inProgress) value = { inProgress: query.inProgress === 'true' ? 1 : 0 };
    const data = await this._model.findAll({ where: value, raw: true });
    const result = await Promise.all(data.map(async (
      { inProgress, homeTeam, awayTeam, ...rest },
    ) => {
      const h = await TeamModel.findOne(
        { where: { id: homeTeam }, raw: true, attributes: { exclude: ['id'] } },
      );
      const a = await TeamModel.findOne(
        { where: { id: awayTeam }, raw: true, attributes: { exclude: ['id'] } },
      );
      return {
        ...rest, homeTeam, awayTeam, inProgress: Boolean(inProgress), teamHome: h, teamAway: a,
      };
    }));
    return result as unknown as IMatch[];
  }

  public async getMatches(): Promise<IMatch[]> {
    const result = await this._model.findAll(
      { where: { inProgress: false },
        attributes: ['homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals'],
        include: [{ model: TeamModel, attributes: ['teamName'], as: 'teamHome' },
          { model: TeamModel, attributes: ['teamName'], as: 'teamAway' }],
        // raw: true,
      },
    );
    return result as unknown as IMatch[];
  }

  public async createMatch(match: IMatch): Promise<MatchModel> {
    const teams = { homeTeam: match?.homeTeam, awayTeam: match?.awayTeam };
    await this._teamService.isTeamValid(teams); // verifica se os times estão no banco de dados.
    const rawData = await this._model.create(
      { ...match, inProgress: true },
    ).then((data) => data.toJSON());
    return rawData as MatchModel;
  }

  public async finishMatch(id: number): Promise<void> {
    const match = await this._model.findByPk(id);
    match?.set({
      inProgress: false,
    });
    await match?.save();
  }

  public async changeMatch(id: number, newScore:
  { homeTeamGoals: number, awayTeamGoals: number }): Promise<{ message: string }> {
    const match = await this._model.findByPk(id);
    match?.set({
      homeTeamGoals: newScore.homeTeamGoals,
      awayTeamGoals: newScore.awayTeamGoals,
    });
    await match?.save();
    return { message: 'Changed' };
  }
}

export default MatchesService;
