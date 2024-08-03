import { INTEGER, Model } from 'sequelize';
import db from '.';
import IUserMessages from '../../interfaces/userMessages.interface';
import Chats from './Chats';
import Messages from './Messages';
import Users from './Users';

class UserMessages extends Model implements IUserMessages{
  declare userId?: number;
  declare chatId?: number;
  declare messageId?: number;
}

UserMessages.init({
  userId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  chatId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  messageId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
}, {
  sequelize: db,
  modelName: 'user_messages',
  tableName: 'user_messages',
  timestamps: false,
  underscored: true,
})

UserMessages.belongsTo(Users, {
  foreignKey: 'userId',
});

UserMessages.belongsTo(Chats, {
  foreignKey: 'chatId',
});

UserMessages.belongsTo(Messages, {
  foreignKey: 'messageId',
});

export default UserMessages