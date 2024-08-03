"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("../../database/models/Users"));
const chats_service_1 = __importDefault(require("../chats.service"));
const newChatValidation = (username, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { message: chats } = yield chats_service_1.default.getAll(id);
    const doesTheChatExist = chats.find((chat) => chat.username === username);
    if (doesTheChatExist)
        return { type: 'INVALID_VALUE', message: 'Chat already exists' };
    const userLogged = yield Users_1.default.findByPk(id);
    const { username: usernameIsValid } = userLogged;
    if (usernameIsValid === username)
        return { type: 'INVALID_VALUE', message: 'Invalid username' };
    const users = yield Users_1.default.findAll();
    const doesTheUserExist = users.find((u) => u.username === username);
    if (!doesTheUserExist)
        return { type: 'INVALID_VALUE', message: 'Invalid username' };
    return { type: null, message: '' };
});
exports.default = newChatValidation;
