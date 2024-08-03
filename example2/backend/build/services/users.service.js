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
const hashPassword_1 = __importDefault(require("../auth/hashPassword"));
const jwtFunctions_1 = require("../auth/jwtFunctions");
const Users_1 = __importDefault(require("../database/models/Users"));
const validations_1 = require("./validations");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield Users_1.default.findAll({ attributes: { exclude: ['password'] } });
    return { type: null, message: users };
});
const getUser = (requestedEmail, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, message } = (0, validations_1.userValidation)(requestedEmail, userEmail);
    if (type)
        return { type, message };
    const user = yield Users_1.default.findOne({
        where: { email: requestedEmail },
        attributes: { exclude: ['password', 'id'] },
    });
    return { type: null, message: user };
});
const login = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, message } = yield (0, validations_1.loginValidation)(user);
    if (type)
        return { type, message };
    const userLoged = yield Users_1.default.findOne({ where: { email: user.email } });
    const token = (0, jwtFunctions_1.createToken)(userLoged);
    return { type: null, message: token };
});
const signup = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, message } = yield (0, validations_1.signupValidation)(user);
    if (type)
        return { type, message };
    const { password: pw } = user;
    const hashedPassword = (0, hashPassword_1.default)(user.password);
    user.password = hashedPassword;
    yield Users_1.default.create(Object.assign({}, user));
    return { type: null, message: 'successfully registered user' };
});
const update = ({ name, lastName, image }, email, requestedEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, message } = (0, validations_1.userValidation)(requestedEmail, email);
    if (type)
        return { type, message };
    yield Users_1.default.update({ name, lastName, image }, { where: { email } });
    const userUpdated = yield Users_1.default.findOne({
        where: { email },
        attributes: { exclude: ['password', 'id'] },
    });
    return { type: null, message: userUpdated };
});
exports.default = {
    getAll,
    login,
    signup,
    getUser,
    update,
};
