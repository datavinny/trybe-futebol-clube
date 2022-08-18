import * as jwt from 'jsonwebtoken';
import Login from '../interfaces/login.interface';

const generateToken = (user: Login): string => {
  const payload = user;
  const secret = process.env.JWT_SECRET as string || 'jwt_secret';
  const options: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '7d',
  };
  const token = jwt.sign(payload, secret, options);
  return token;
};

export default generateToken;
