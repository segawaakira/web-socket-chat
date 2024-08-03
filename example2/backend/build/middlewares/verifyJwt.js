"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET || 'chatRoom';
exports.default = (req, res, next) => {
    const { authorization: token } = req.headers;
    if (!token)
        return res.status(401).json({ message: 'Token not found' });
    try {
        const user = jsonwebtoken_1.default.verify(token, secret);
        if (!user)
            return res.status(401).json({ message: 'Invalid token' });
        req.body = Object.assign(Object.assign({}, user), req.body);
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
