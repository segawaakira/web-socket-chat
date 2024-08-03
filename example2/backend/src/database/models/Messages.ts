import { DataTypes, DATE, INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import IMessage from '../../interfaces/messages.interface';

class Messages extends Model implements IMessage {
  declare id?: number;
  declare userId: number;
  declare chatId: number;
  declare message: string;
  declare date: string;
}

Messages.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: STRING,
    allowNull: false,
  },
  date: {
    type: DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  sequelize: db,
  modelName: 'messages',
  tableName: 'messages',
  timestamps: false,
  underscored: true,
})


export default Messages;