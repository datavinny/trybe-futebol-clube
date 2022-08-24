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

  public async getTeamNames(): Promise<{ teamName: string }[]> {
    const names = await this._model.findAll({ attributes: ['teamName'], raw: true });
    return names;
  }

  public async isTeamValid(
    obj: { homeTeam: number, awayTeam: number },
  ): Promise<void> {
    const { homeTeam, awayTeam } = obj;
    const message = 'It is not possible to create a match with two equal teams';
    if (homeTeam === awayTeam) throw new CustomError(401, message);
    const resultHome = await this._model.findByPk(homeTeam);
    const resultAway = await this._model.findByPk(awayTeam);
    if (!resultHome || !resultAway) throw new CustomError(404, 'There is no team with such id!');
  }
}

export default TeamService;
