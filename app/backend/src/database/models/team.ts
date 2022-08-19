import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

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

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Team, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Team, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Team.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Team.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Team;
