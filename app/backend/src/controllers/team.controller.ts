import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamService from '../services/team.services';

class TeamController {
  constructor(private _service = new TeamService()) { }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._service.getAll();
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default TeamController;
