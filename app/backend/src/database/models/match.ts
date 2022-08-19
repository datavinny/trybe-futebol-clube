import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import TeamModel from './team';

class Match extends Model {
  public id!: number;
  public homeTeam: string;
  public homeTeamGoals: number;
  public awayTeam: string;
  public awayTeamGoals: number;
  public inProgress: boolean;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
    // Configuram o que deve acontecer ao atualizar ou excluir um team
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      // Informa a tabela da referência da associação
      model: 'Team',
      // Informa a coluna da referência que é a chave correspondente
      key: 'id',
    },
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'Team',
      key: 'id',
    },
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Matches, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Matches, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

Match.hasMany(TeamModel, { foreignKey: 'id', as: 'homeTeam' });
Match.hasMany(TeamModel, { foreignKey: 'id', as: 'awayTeam' });

export default Match;
