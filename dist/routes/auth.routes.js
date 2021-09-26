"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var authValidator_1 = require("../middlewares/authValidator");
var router = (0, express_1.Router)();
/**
 * route to log in an user
 */
router.post('/login', auth_controller_1.authUser, function (req, res) {
    res.status(200).json({ msg: "Logged in" });
});
/**
 * route to create a new user
 */
router.post('/register', auth_controller_1.createUser);
/**
 * update user information
 */
router.put('/setting', authValidator_1.authValidator, auth_controller_1.updateUser);
/**
 * update user information
 */
router.post('/users', auth_controller_1.getUsers);
exports.default = router;
