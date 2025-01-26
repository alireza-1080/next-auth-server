import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';

const clientOrigin = process.env.CLIENT_ORIGIN;

//^ Create an express app
const app = express();

//^ Use the middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

//^ Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});



export default app;