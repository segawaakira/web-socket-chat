"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userValidation = (requestedEmail, userEmail) => {
    const isValid = requestedEmail === userEmail;
    if (!isValid)
        return { type: 'INVALID_VALUE', message: 'Not authorized' };
    return { type: null, message: '' };
};
exports.default = userValidation;
