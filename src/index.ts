import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connection } from './Data/db/connection';
import CategoryRouter from './Routers/Category/Category';
import NotesRouter from './Routers/Notes/Notes';
import AuthRouter from './Routers/Auth/Auth';
import dotenv from 'dotenv';

dotenv.config()

const app = express();

const port = process.env.PORT || 3002;

connection();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/api/category', CategoryRouter);
app.use('/api/notes', NotesRouter);
app.use('/api/auth', AuthRouter);

app.listen(port, () => {
    console.log(`Server started port ${port}`)
})