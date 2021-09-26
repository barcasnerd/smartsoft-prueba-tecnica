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
var authValidator_1 = require("./middlewares/authValidator");
// import routes
var auth_routes_1 = __importDefault(require("./routes/auth.routes"));
var product_routes_1 = __importDefault(require("./routes/product.routes"));
var purchase_routes_1 = __importDefault(require("./routes/purchase.routes"));
// inizialitations
var app = (0, express_1.default)();
(0, typeorm_1.createConnection)(); // start orm database connection
// settings
app.set('port', 3000); // set listening port
// middlewares
app.use((0, cors_1.default)()); // allow multiple server comunication
app.use((0, morgan_1.default)('dev')); // HTTP request logger 
app.use(express_1.default.json()); //  recognize the incoming Request as JSON
app.use((0, cookie_parser_1.default)(config_1.default.cookieParser_SECRET)); // parse cookies attached to the client request
// create session integration
app.use((0, express_session_1.default)({
    secret: config_1.default.cookieParser_SECRET,
    resave: true,
    saveUninitialized: true
}));
// create authenticator
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// routes
app.use('/api/v1', auth_routes_1.default);
app.use('/api/v1/products', authValidator_1.authValidator, product_routes_1.default);
app.use('/api/v1/purchases', authValidator_1.authValidator, purchase_routes_1.default);
// start the server
app.listen(app.get('port'));
console.log("server on port " + app.get('port'));
