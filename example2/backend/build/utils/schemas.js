"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesSchema = exports.signupSchema = exports.loginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.loginSchema = loginSchema;
const signupSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    username: joi_1.default.string().required(),
    image: joi_1.default.string(),
});
exports.signupSchema = signupSchema;
const messagesSchema = joi_1.default.object({
    message: joi_1.default.string().required(),
    chatId: joi_1.default.number().required(),
});
exports.messagesSchema = messagesSchema;
