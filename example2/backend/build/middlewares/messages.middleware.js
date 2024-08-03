"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mapError_1 = __importDefault(require("../utils/mapError"));
const schemas_1 = require("../utils/schemas");
const messagesMiddleware = (req, res, next) => {
    const { message } = req.body;
    const { chatId } = req.params;
    const { error } = schemas_1.messagesSchema.validate({ message, chatId });
    if (error) {
        const { type, message } = error.details[0];
        return res.status((0, mapError_1.default)(type)).json({ message });
    }
    next();
};
exports.default = messagesMiddleware;
