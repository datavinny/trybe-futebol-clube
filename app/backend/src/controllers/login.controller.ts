import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ILogin from '../utils/interfaces/login.interface';
import LoginService from '../services/login.services';

class LoginController {
  constructor(private _service = new LoginService()) { }

  public async checkLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const login = req.body as ILogin;
      const result = await this._service.checkLogin(login);
      res.status(StatusCodes.OK).json({ token: result });
    } catch (error) {
      next(error);
    }
  }

  public static async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      const result = await LoginService.validate(token as string);
      res.status(StatusCodes.OK).json({ role: result });
    } catch (error) {
      next(error);
    }
  }
}

export default LoginController;
