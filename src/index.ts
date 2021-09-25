import 'reflect-metadata' // config for typescript decorators
import express from 'express'; // module for server implementation
import morgan from 'morgan'; // http requests debugger
import cors from 'cors'; // enable other servers integration
import userRoutes from './routes/user.routes';
import { createConnection } from "typeorm";

// inizialitations
const app = express();
createConnection(); // start orm database connection

// settings
app.set('port', 3000); // set listening port

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api', userRoutes);


// start
app.listen(app.get('port'));
console.log(`server on port ${app.get('port')}`);