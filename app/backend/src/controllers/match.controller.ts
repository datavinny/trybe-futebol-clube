import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchesService from '../services/match.services';

class MatchesController {
  constructor(private _service = new MatchesService()) { }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._service.getAll();
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default MatchesController;
