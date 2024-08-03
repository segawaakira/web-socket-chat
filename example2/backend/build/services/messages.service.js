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
const Messages_1 = __importDefault(require("../database/models/Messages"));
const UserMessages_1 = __importDefault(require("../database/models/UserMessages"));
const Users_1 = __importDefault(require("../database/models/Users"));
const validations_1 = require("./validations");
const getAll = (chatId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, message } = yield (0, validations_1.messagesValidation)(chatId, userId);
    if (type)
        return { type, message };
    const userMessages = yield UserMessages_1.default.findAll({ where: { chatId } });
    const messagesPromises = userMessages.map(({ messageId }) => __awaiter(void 0, void 0, void 0, function* () {
        const messages = yield Messages_1.default.findByPk(messageId);
        return messages;
    }));
    const usernamesPromises = userMessages.map(({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const usernames = yield Users_1.default.findByPk(userId);
        return usernames;
    }));
    const usernames = yield Promise.all(usernamesPromises);
    const messages = yield Promise.all(messagesPromises);
    const result = [];
    userMessages.map((_, index) => {
        result.push({
            message: messages[index].message,
            date: messages[index].date,
            username: usernames[index].username,
            name: usernames[index].name,
            lastName: usernames[index].lastName,
        });
    });
    return { type: null, message: result };
});
const create = (chatId, userId, message) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, message: errorMessage } = yield (0, validations_1.newMessageValidation)(userId, chatId);
    if (type)
        return { type, message: errorMessage };
    const { id: messageId } = yield Messages_1.default.create({ message });
    yield UserMessages_1.default.create({ userId, chatId, messageId });
    return { type: null, message: 'Message created successfully' };
});
exports.default = {
    getAll,
    create,
};
