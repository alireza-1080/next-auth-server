import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from './routes/auth.js';

//^ Create an express app
const app = express();

//^ Use the middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

//^ Routes
app.use('/auth', authRoutes);
// app.use('/todos', todoRoutes);



export default app;