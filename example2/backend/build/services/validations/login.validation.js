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
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_1 = __importDefault(require("../../database/models/Users"));
const loginValidation = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield Users_1.default.findAll();
    const user = users.find((u) => u.email === email);
    if (!user)
        return { type: 'INVALID_VALUE', message: 'Email or password are invalid' };
    const passwordIsValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordIsValid)
        return { type: 'INVALID_VALUE', message: 'Email or password are invalid' };
    return { type: null, message: '' };
});
exports.default = loginValidation;
