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
    const { user: { id } } = req.body;
    const { message } = yield services_1.chatsService.getAll(+id);
    res.status(200).json(message);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: { id } } = req.body;
    const { username } = req.params;
    const { type, message } = yield services_1.chatsService.create(username, id);
    if (type)
        return res.status((0, mapError_1.default)(type)).json({ message });
    res.status(201).json({ message });
});
exports.default = {
    getAll,
    create,
};
