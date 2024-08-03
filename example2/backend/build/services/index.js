"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesService = exports.chatsService = exports.usersService = void 0;
const chats_service_1 = __importDefault(require("./chats.service"));
exports.chatsService = chats_service_1.default;
const messages_service_1 = __importDefault(require("./messages.service"));
exports.messagesService = messages_service_1.default;
const users_service_1 = __importDefault(require("./users.service"));
exports.usersService = users_service_1.default;
