import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import IToken from '../interfaces/token.interface';

const verifyToken = (token: string): IToken => {
  const secret = process.env.JWT_SECRET as string || 'jwt_secret';
  const options: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '7d',
  };
  const { email, role } = jwt.verify(token, secret, options) as jwt.JwtPayload;
  return { email, role };
};

export default verifyToken;
