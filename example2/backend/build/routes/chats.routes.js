"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get('/', middlewares_1.verifyJwt, controllers_1.chatsController.getAll);
router.post('/:username', middlewares_1.verifyJwt, controllers_1.chatsController.create);
exports.default = router;
