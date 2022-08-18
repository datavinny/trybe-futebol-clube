import User from '../database/models/user';
import ILogin from '../interfaces/login.interface';
import generateToken from './token.services';

class LoginService {
  constructor(private model = User) { }

  public async create(login: ILogin): Promise<string> {
    const { email, password } = login;
    await this.model.create({ email, password });
    const token = generateToken(email);
    return token;
  }
}

export default LoginService;
