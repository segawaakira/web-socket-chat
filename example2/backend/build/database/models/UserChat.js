"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const Chats_1 = __importDefault(require("./Chats"));
const Users_1 = __importDefault(require("./Users"));
class UserChats extends sequelize_1.Model {
}
UserChats.init({
    userId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    chatId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
}, {
    sequelize: _1.default,
    modelName: 'user_chats',
    tableName: 'user_chats',
    timestamps: false,
    underscored: true,
});
UserChats.belongsTo(Users_1.default, {
    foreignKey: 'userId',
});
UserChats.belongsTo(Chats_1.default, {
    foreignKey: 'chatId',
});
exports.default = UserChats;
