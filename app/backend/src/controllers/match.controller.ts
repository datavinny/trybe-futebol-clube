import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchesService from '../services/match.services';

class MatchesController {
  constructor(private _service = new MatchesService()) { }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { query } = req;
      const result = await this._service.getAll(query as { inProgress: string });
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async createMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const match = req.body;
      const result = await this._service.createMatch(match);
      res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async finishMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this._service.finishMatch(Number(id));
      res.status(StatusCodes.OK).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  public async changeMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const newScore = { homeTeamGoals, awayTeamGoals };
      const result = await this._service.changeMatch(Number(id), newScore);
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default MatchesController;
