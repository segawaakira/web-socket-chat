"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesController = exports.chatsController = exports.usersController = void 0;
const chats_controller_1 = __importDefault(require("./chats.controller"));
exports.chatsController = chats_controller_1.default;
const messages_controller_1 = __importDefault(require("./messages.controller"));
exports.messagesController = messages_controller_1.default;
const users_controller_1 = __importDefault(require("./users.controller"));
exports.usersController = users_controller_1.default;
