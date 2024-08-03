"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class Messages extends sequelize_1.Model {
}
Messages.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    message: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    }
}, {
    sequelize: _1.default,
    modelName: 'messages',
    tableName: 'messages',
    timestamps: false,
    underscored: true,
});
exports.default = Messages;
