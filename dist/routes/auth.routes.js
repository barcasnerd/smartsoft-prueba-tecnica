"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var router = (0, express_1.Router)();
/**
 * route to log in an user
 */
router.post('/login', auth_controller_1.authUser);
/**
 * route to create a new user
 */
router.post('/register', auth_controller_1.createUser);
exports.default = router;
