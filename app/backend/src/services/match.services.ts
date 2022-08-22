import IMatch from '../utils/interfaces/match.interface';
import MatchModel from '../database/models/match';
import TeamModel from '../database/models/team';

class MatchesService {
  constructor(private _model = MatchModel) { }

  public async getAll(query: any): Promise<IMatch[]> {
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

  public async createMatch(match: IMatch): Promise<MatchModel> {
    const rawData = await this._model.create(
      { ...match, inProgress: true },
    ).then((data) => data.toJSON());
    return rawData as MatchModel;
  }
}

export default MatchesService;
