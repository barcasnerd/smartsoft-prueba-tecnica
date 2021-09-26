"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // config for typescript decorators
var express_1 = __importDefault(require("express")); // module for server implementation
var morgan_1 = __importDefault(require("morgan")); // http requests debugger
var cors_1 = __importDefault(require("cors")); // enable other servers integration
var cookie_parser_1 = __importDefault(require("cookie-parser")); // parse cookies attached to the client request
var express_session_1 = __importDefault(require("express-session")); // create and manage a session middleware
var config_1 = __importDefault(require("./config/config")); // multiple env (if exist) configurations
var typeorm_1 = require("typeorm"); // main database orm
var passport_1 = __importDefault(require("passport"));
// import routes
var user_routes_1 = __importDefault(require("./routes/user.routes"));
var auth_routes_1 = __importDefault(require("./routes/auth.routes"));
// inizialitations
var app = (0, express_1.default)();
(0, typeorm_1.createConnection)(); // start orm database connection
// settings
app.set('port', 3000); // set listening port
// middlewares
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)(config_1.default.cookieParser_SECRET));
app.use((0, express_session_1.default)({
    secret: config_1.default.cookieParser_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// routes
app.use('/api', user_routes_1.default);
app.use('/auth', auth_routes_1.default);
// start
app.listen(app.get('port'));
console.log("server on port " + app.get('port'));
