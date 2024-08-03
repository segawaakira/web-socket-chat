import { DataTypes, DATE, INTEGER, Model } from "sequelize";
import db from '.';
import IChats from "../../interfaces/chats.interface";

class Chats extends Model implements IChats {
  declare id?: number;
  declare createdAt: string;
}

Chats.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  createdAt: {
    type: DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  sequelize: db,
  modelName: 'chats',
  tableName: 'chats',
  timestamps: false,
})

export default Chats;