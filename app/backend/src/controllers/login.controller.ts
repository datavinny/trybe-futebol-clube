import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/login.services';

class LoginController {
  constructor(private loginService = new LoginService()) { }

  // public getAll = async (_req: Request, res: Response) => {
  //   const users = await this.userService.getAll();
  //   res.status(StatusCodes.OK).json(users);
  // };

  public async create(req: Request, res: Response) {
    const payload = req.body;
    const result = await this.loginService.create(payload);
    res.status(StatusCodes.OK).json({ token: result });
  }
}

export default LoginController;
