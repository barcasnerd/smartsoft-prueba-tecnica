import express from 'express' // module for server implementation
import morgan from 'morgan' // http requests debugger
import cors from 'cors' // enable other servers integration
import userRoutes from './routes/user.routes'
import { createConnection } from "typeorm"

const app = express();

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use(userRoutes);


// setting server listen config
app.set('port', 3000);
app.listen(app.get('port'));
console.log(`server on port ${app.get('port')}`);