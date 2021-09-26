import 'reflect-metadata' // config for typescript decorators
import express from 'express'; // module for server implementation
import morgan from 'morgan'; // http requests debugger
import cors from 'cors'; // enable other servers integration
import cookieParser from 'cookie-parser'; // parse cookies attached to the client request
import session from "express-session"; // create and manage a session middleware
import config from "./config/config"; // multiple env (if exist) configurations
import { createConnection } from "typeorm"; // main database orm
import passport from 'passport'
import { authValidator } from "./middlewares/authValidator";

// import routes
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";

// inizialitations
const app = express();
createConnection(); // start orm database connection

// settings
app.set('port', 3000); // set listening port

// middlewares
app.use(cors()); // allow multiple server comunication
app.use(morgan('dev')); // HTTP request logger 
app.use(express.json()); //  recognize the incoming Request as JSON
app.use(cookieParser(config.cookieParser_SECRET)); // parse cookies attached to the client request

// create session integration
app.use(session({
    secret: config.cookieParser_SECRET,
    resave: true,
    saveUninitialized: true
}));

// create authenticator
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/',authRoutes);
app.use('/products', authValidator, productRoutes);

// start the server
app.listen(app.get('port'));
console.log(`server on port ${app.get('port')}`);