import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { StatusCodes } from 'http-status-codes';
import IToken from '../interfaces/token.interface';
import CustomError from '../customError';

const verifyToken = (token: string): IToken => {
  const secret = process.env.JWT_SECRET as string || 'jwt_secret';
  const { email, role } = jwt.verify(token, secret) as IToken;
  if (!email) throw new CustomError(StatusCodes.UNAUTHORIZED, 'Token Invalid');
  return { email, role };
};

export default verifyToken;
