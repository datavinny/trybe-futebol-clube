import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  private id!: number;
  public username!: string;
  public role!: string;
  public email!: string;
  private password!: string;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  username: {
    allowNull: false,
    type: STRING(30),
  },
  role: {
    allowNull: false,
    type: STRING(30),
  },
  email: {
    allowNull: false,
    type: STRING(30),
  },
  password: {
    allowNull: false,
    type: STRING(100),
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'User',
  timestamps: false,
});

export default User;
