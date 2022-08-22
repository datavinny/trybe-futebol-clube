import { StatusCodes } from 'http-status-codes';
import TeamModel from '../database/models/team';
import CustomError from '../utils/customError';

class TeamService {
  constructor(private _model = TeamModel) { }

  public async getAll(): Promise<TeamModel[]> {
    const teams = await this._model.findAll({ raw: true });
    return teams;
  }

  public async getById(id: number): Promise<TeamModel> {
    const team = await this._model.findByPk(id);
    if (!team) throw new CustomError(StatusCodes.NOT_FOUND, 'Not Found.');
    return team;
  }
}

export default TeamService;
