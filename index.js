import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connection from './mongo/connection.js'

import userRouter from './routes/user.routes.js';
import todoRouter from './routes/todo.routes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '30mb', extended: true }));

app.get('/', (req, res) => {
    res.send({ message: "Hello World!" });
});

app.use('/api/user', userRouter);
app.use('/api/todo', todoRouter);


const startServer = async () => {
    try {
        connection(process.env.CONNECTION_URL);
        app.listen(process.env.PORT, () => console.log(`Server Started on Port: ${process.env.PORT}`));
    } catch (error) {
        console.log(error);
    }
};

startServer();