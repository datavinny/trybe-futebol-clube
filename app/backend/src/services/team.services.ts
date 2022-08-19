import TeamModel from '../database/models/team';

class TeamService {
  constructor(private _model = TeamModel) { }

  public async getAll(): Promise<TeamModel[]> {
    console.log('test');
    const teams = await this._model.findAll({ raw: true });
    console.log('teams', teams);
    return teams;
  }
}

export default TeamService;
