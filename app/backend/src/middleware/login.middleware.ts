import { Request, Response, NextFunction } from 'express';
import LoginSchema from '../schemas/login.schemas';
import Login from '../interfaces/login.interface';

class LoginMiddleware {
  public create = async (req: Request, res: Response, next: NextFunction) => {
    const login: Login = req.body;
    const { error, value } = await LoginSchema.validateAsync(login);
    if (error) {
      next(error); // envia para o middleware de error
    }
    req.body = value;
    next();
  };
}

export default LoginMiddleware;
