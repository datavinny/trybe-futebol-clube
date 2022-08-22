import * as bcrypt from 'bcryptjs';
import CustomError from '../utils/customError';
import UserModel from '../database/models/user';
import ILogin from '../utils/interfaces/login.interface';
import generateToken from '../utils/JWT/generateToken';
import verifyToken from '../utils/JWT/verifyToken';

class UserService {
  constructor(private _model = UserModel) { }

  public async checkLogin(login: ILogin): Promise<string> {
    const { email, password } = login;
    const user = await this._model.findOne({ where: { email }, raw: true });
    if (!user) throw new CustomError(401, 'Incorrect email or password');
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) throw new CustomError(401, 'Incorrect email or password');
    const token = generateToken({ email: user.email, role: user.role });
    return token;
  }

  public static async getUserRole(token: string): Promise<string> {
    // const { email } = verifyToken(token);
    // const user = await this._model.findOne({ where: { email }, raw: true });
    // if (!user) throw new Error();
    // return { role: user.role };
    const { role } = verifyToken(token);
    return role;
  }
}

export default UserService;
