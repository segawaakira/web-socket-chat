"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = exports.newMessageValidation = exports.messagesValidation = exports.newChatValidation = exports.signupValidation = exports.loginValidation = void 0;
const login_validation_1 = __importDefault(require("./login.validation"));
exports.loginValidation = login_validation_1.default;
const messages_validation_1 = __importDefault(require("./messages.validation"));
exports.messagesValidation = messages_validation_1.default;
const newChat_validation_1 = __importDefault(require("./newChat.validation"));
exports.newChatValidation = newChat_validation_1.default;
const newMessage_validation_1 = __importDefault(require("./newMessage.validation"));
exports.newMessageValidation = newMessage_validation_1.default;
const singup_validation_1 = __importDefault(require("./singup.validation"));
exports.signupValidation = singup_validation_1.default;
const user_validations_1 = __importDefault(require("./user.validations"));
exports.userValidation = user_validations_1.default;
