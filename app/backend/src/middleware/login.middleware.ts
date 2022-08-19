import { Request, Response, NextFunction } from 'express';
import LoginSchema from '../utils/schemas/login.schemas';
import Login from '../utils/interfaces/login.interface';

class LoginMiddleware {
  public validateBody = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const login: Login = req.body;
      await LoginSchema.validateAsync(login);
      next();
    } catch (error) {
      next(error);
    }
  };
}

export default LoginMiddleware;
