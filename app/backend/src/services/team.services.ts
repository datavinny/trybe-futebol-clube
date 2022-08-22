import TeamModel from '../database/models/team';

class TeamService {
  constructor(private _model = TeamModel) { }

  public async getAll(): Promise<TeamModel[]> {
    const teams = await this._model.findAll({ raw: true });
    return teams;
  }

  public async getById(id: number): Promise<TeamModel> {
    const team = await this._model.findByPk(id);
    console.log(team);
    if (!team) throw new Error('Not Found.');
    return team;
  }
}

export default TeamService;
