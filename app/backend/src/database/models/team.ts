import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  public id!: number;
  public teamName!: string;
}

Team.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING(30),
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'Team',
  timestamps: false,
});

export default Team;
