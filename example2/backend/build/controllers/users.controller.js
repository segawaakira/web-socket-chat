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
const users_service_1 = __importDefault(require("../services/users.service"));
const mapError_1 = __importDefault(require("../utils/mapError"));
const getAll = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = yield users_service_1.default.getAll();
    res.status(200).json(message);
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const { user: { email: userEmail } } = req.body;
    const { type, message } = yield users_service_1.default.getUser(email, userEmail);
    if (type)
        return res.status((0, mapError_1.default)(type)).json({ message });
    res.status(200).json(message);
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const { type, message } = yield users_service_1.default.login(user);
    if (type)
        return res.status((0, mapError_1.default)(type)).json({ message });
    res.status(200).json({ token: message });
});
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const { type, message } = yield users_service_1.default.signup(user);
    if (type)
        return res.status((0, mapError_1.default)(type)).json({ message });
    res.status(201).json({ message });
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const { email } = req.params;
    const { user: { email: userEmail } } = req.body;
    const { type, message } = yield users_service_1.default.update(user, email, userEmail);
    if (type)
        return res.status((0, mapError_1.default)(type)).json({ message });
    res.status(201).json(message);
});
exports.default = {
    getAll,
    login,
    signup,
    getUser,
    update,
};
