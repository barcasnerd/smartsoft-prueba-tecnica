import 'reflect-metadata' // config for typescript decorators
import express from 'express'; // module for server implementation
import morgan from 'morgan'; // http requests debugger
import cors from 'cors'; // enable other servers integration
import cookieParser from 'cookie-parser'; // parse cookies attached to the client request
import session from "express-session"; // create and manage a session middleware
import config from "./config/config"; // multiple env (if exist) configurations
import { createConnection } from "typeorm"; // main database orm
import passport from 'passport'

// import routes
import userRoutes from './routes/user.routes';
import authenticateRoutes from './routes/auth.routes';

// inizialitations
const app = express();
createConnection(); // start orm database connection

// settings
app.set('port', 3000); // set listening port

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser(config.cookieParser_SECRET));
app.use(session({
    secret: config.cookieParser_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/api', userRoutes);
app.use('/auth', authenticateRoutes);


// start
app.listen(app.get('port'));
console.log(`server on port ${app.get('port')}`);