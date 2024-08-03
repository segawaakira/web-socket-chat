"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesRoute = exports.chatsRoute = exports.usersRoute = void 0;
const chats_routes_1 = __importDefault(require("./chats.routes"));
exports.chatsRoute = chats_routes_1.default;
const messages_routes_1 = __importDefault(require("./messages.routes"));
exports.messagesRoute = messages_routes_1.default;
const user_routes_1 = __importDefault(require("./user.routes"));
exports.usersRoute = user_routes_1.default;
