import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './team';

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
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'Team',
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

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

// Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'teamHome' });
// Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Match;
