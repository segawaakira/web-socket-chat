"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const app_ws_1 = __importDefault(require("./app-ws"));
require('dotenv').config();
const PORT = process.env.PORT;
const server = app_1.default.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
(0, app_ws_1.default)(server);
exports.default = server;
