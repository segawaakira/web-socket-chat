"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapError(type) {
    switch (type) {
        case 'INVALID_VALUE':
            return 422;
        case 'any.required':
            return 422;
        case 'string.base':
            return 422;
        case 'number.base':
            return 422;
        default:
            return 500;
    }
}
exports.default = mapError;
