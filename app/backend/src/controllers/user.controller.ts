import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/user.services';
import ILogin from '../utils/interfaces/login.interface';
import LoginSchema from '../utils/schemas/login.schemas';

class UserController {
  constructor(private _service = new UserService()) { }

  public async checkLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const login = req.body as ILogin;
      await LoginSchema.validateAsync(login);
      const result = await this._service.checkLogin(login);
      res.status(StatusCodes.OK).json({ token: result });
    } catch (error) {
      next(error);
    }
  }

  public static async getUserRole(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      const result = await UserService.getUserRole(token as string);
      res.status(StatusCodes.OK).json({ role: result });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
