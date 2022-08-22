import { Request, Response, NextFunction } from 'express';
import verifyToken from '../utils/JWT/verifyToken';

const isTokenValid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    const result = verifyToken(token as string);
    console.log(result);
    next();
  } catch (error) {
    next(error);
  }
};

export default isTokenValid;
