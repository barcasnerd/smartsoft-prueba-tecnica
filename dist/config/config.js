"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    cookieParser_SECRET: process.env.JWT_SECRET || 'secret',
    admin_PASSWORD: process.env.ADMIN_PASSWORD || 'admin',
    admin_EMAIL: process.env.ADMIN_EMAIL || 'admin@admin.com',
};
exports.default = config;
