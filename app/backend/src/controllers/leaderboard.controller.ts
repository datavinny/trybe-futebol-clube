import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderboardService from '../services/leaderboard.services';

class LeaderboardController {
  constructor(private _service = new LeaderboardService()) { }

  public async getHomeLeaderboard(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._service.getHomeLeaderboard();
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async getAwayLeaderboard(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._service.getAwayLeaderboard();
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async getLeaderboard(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._service.getLeaderboard();
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default LeaderboardController;
