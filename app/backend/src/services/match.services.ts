import IMatch from '../utils/interfaces/match.interface';
import MatchesModel from '../database/models/match';

class MatchesService {
  constructor(private _model = MatchesModel) { }

  public async getAll(query: any): Promise<MatchesModel[]> {
    if (query) {
      const { inProgress: status, ...rest } = query;
      const inProgress = status === 'true' ? 1 : 0;
      const matches = await this._model.findAll(
        { where: { ...rest, inProgress }, raw: true },
      );
      return matches;
    }
    const matches = await this._model.findAll({ raw: true });
    return matches;
  }

  public async createMatch(match:
  {
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  }): Promise<IMatch> {
    const rawData = await this._model.create(
      { ...match, inProgress: true },
    ).then((data) => data.toJSON());
    return rawData as IMatch;
  }
}

export default MatchesService;
