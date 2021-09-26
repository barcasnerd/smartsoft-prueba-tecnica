"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    cookieParser_SECRET: process.env.JWT_SECRET || 'secret'
};
exports.default = config;
