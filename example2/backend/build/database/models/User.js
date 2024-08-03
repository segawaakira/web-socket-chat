"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const Chats_1 = __importDefault(require("./Chats"));
const Messages_1 = __importDefault(require("./Messages"));
class Users extends sequelize_1.Model {
}
Users.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    name: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.STRING,
        allowNull: true,
    }
}, {
    sequelize: _1.default,
    modelName: 'users',
    tableName: 'users',
    timestamps: false,
    underscored: true,
});
Users.hasMany(Chats_1.default, {
    foreignKey: 'user_id',
    as: 'userchats'
});
Users.hasMany(Messages_1.default, {
    foreignKey: 'user_id',
    as: 'userchats'
});
exports.default = Users;
