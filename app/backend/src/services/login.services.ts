import LoginModel from '../database/models/user';
import Login from '../interfaces/login.interface';

class LoginService {
  public create = async (login: Login): Promise<Login> => {
    const books = await LoginModel.create(login);
    return books;
  };
}

export default LoginService;
