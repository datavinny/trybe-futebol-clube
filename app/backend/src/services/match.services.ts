import MatchesModel from '../database/models/match';

class MatchesService {
  constructor(private _model = MatchesModel) { }

  public async getAll(): Promise<MatchesModel[]> {
    const matches = await this._model.findAll({ raw: true });
    return matches;
  }
}

export default MatchesService;
