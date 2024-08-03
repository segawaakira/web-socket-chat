import { INTEGER, Model, STRING } from "sequelize";
import db from '.';
import IUser from '../../interfaces/user.interface';

class Users extends Model implements IUser {
  declare id?: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare image?: string;
  declare username: string;
  declare lastName: string;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  lastName: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  image: {
    type: STRING,
    allowNull: true,
  }
}, {
  sequelize: db,
  underscored: true,
  modelName: 'users',
  tableName: 'users',
  timestamps: false,
})


export default Users;