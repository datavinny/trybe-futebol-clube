import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const generateToken = (payload: string): string => {
  const secret = process.env.JWT_SECRET as string || 'jwt_secret';
  const options: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '7d',
  };
  const token = jwt.sign(payload, secret, options);
  return token;
};

export default generateToken;
