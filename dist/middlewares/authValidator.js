"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidator = void 0;
var authValidator = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.status(401).json({ msg: "Please login o register first" });
    }
};
exports.authValidator = authValidator;
