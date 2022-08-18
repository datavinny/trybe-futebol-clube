import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/login.services';
import generateToken from '../services/token.services';

class LoginController {
  constructor(private loginService = new LoginService()) { }

  // public getAll = async (_req: Request, res: Response) => {
  //   const users = await this.userService.getAll();
  //   res.status(StatusCodes.OK).json(users);
  // };

  public create = async (req: Request, res: Response) => {
    const login = req.body;
    const loginCreated = await this.loginService.create(login);
    const token = generateToken(loginCreated);
    res.status(StatusCodes.OK).json({ token });
  };
}

export default LoginController;
