"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // config for typescript decorators
var express_1 = __importDefault(require("express")); // module for server implementation
var morgan_1 = __importDefault(require("morgan")); // http requests debugger
var cors_1 = __importDefault(require("cors")); // enable other servers integration
var user_routes_1 = __importDefault(require("./routes/user.routes"));
var typeorm_1 = require("typeorm");
// inizialitations
var app = (0, express_1.default)();
(0, typeorm_1.createConnection)(); // start orm database connection
// settings
app.set('port', 3000); // set listening port
// middlewares
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
// routes
app.use('/api', user_routes_1.default);
// start
app.listen(app.get('port'));
console.log("server on port " + app.get('port'));
