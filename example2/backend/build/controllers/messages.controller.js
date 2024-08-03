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
const services_1 = require("../services");
const mapError_1 = __importDefault(require("../utils/mapError"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    const { user: { id: userId } } = req.body;
    const { type, message } = yield services_1.messagesService.getAll(+chatId, +userId);
    if (type)
        return res.status((0, mapError_1.default)(type)).json({ message });
    res.status(200).json(message);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, user: { id: userId } } = req.body;
    const { chatId } = req.params;
    const { type, message: result } = yield services_1.messagesService.create(+chatId, +userId, message);
    if (type)
        return res.status((0, mapError_1.default)(type)).json({ message: result });
    res.status(201).json({ message: result });
});
exports.default = {
    getAll,
    create,
};
