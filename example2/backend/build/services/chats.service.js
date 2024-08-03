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
const Chats_1 = __importDefault(require("../database/models/Chats"));
const UserChat_1 = __importDefault(require("../database/models/UserChat"));
const Users_1 = __importDefault(require("../database/models/Users"));
const validations_1 = require("./validations");
const getAll = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const chats = yield UserChat_1.default.findAll({
        where: { userId: id }
    });
    const promises = chats.map(({ chatId }) => __awaiter(void 0, void 0, void 0, function* () {
        const userIds = yield UserChat_1.default.findAll({
            where: { chatId }
        });
        return userIds;
    }));
    const result = yield Promise.all(promises);
    const onlyId = result.flat().map(({ userId }) => userId);
    const listOfuserId = [...new Set(onlyId)].filter((i) => i !== id);
    const usersChat = listOfuserId.map((u) => __awaiter(void 0, void 0, void 0, function* () { return Users_1.default.findByPk(u); }));
    const promiseUsersChat = yield Promise.all(usersChat);
    const myUsersChat = promiseUsersChat.map((obj, index) => ({
        name: obj.name,
        lastName: obj.lastName,
        username: obj.username,
        image: obj.image,
        chatId: result[index][0].chatId,
        userId: obj.id,
    }));
    return { type: null, message: myUsersChat };
});
const createChat = () => __awaiter(void 0, void 0, void 0, function* () {
    const { id: chatId } = yield Chats_1.default.create();
    return chatId;
});
const create = (username, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, message } = yield (0, validations_1.newChatValidation)(username, id);
    if (type)
        return { type, message };
    const chatId = yield createChat();
    yield UserChat_1.default.create({ userId: id, chatId });
    const result = yield Users_1.default.findOne({ where: { username } });
    const { id: userId } = result;
    yield UserChat_1.default.create({ userId, chatId });
    return { type: null, message: 'Chat created successfully' };
});
exports.default = {
    getAll,
    create,
};
