import { INTEGER, Model } from "sequelize";
import db from '.';
import IUserChats from "../../interfaces/userChats.interface";
import Chats from "./Chats";
import Users from "./Users";

class UserChats extends Model implements IUserChats {
  declare userId?: number;
  declare chatId?: number;
}

UserChats.init({
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
}, {
  sequelize: db,
  modelName: 'user_chats',
  tableName: 'user_chats',
  timestamps: false,
  underscored: true,
})

UserChats.belongsTo(Users, {
  foreignKey: 'userId',
});

UserChats.belongsTo(Chats, {
  foreignKey: 'chatId',
});

export default UserChats;