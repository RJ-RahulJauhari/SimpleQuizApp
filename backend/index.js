import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './dbconnection/connection.js';
import router from './router/router.js';

dotenv.config();
const server = express();

server.use(cors({ origin: ['http://localhost:5173','http://localhost:5174','https://simplequizapp-1.onrender.com','https://simplequizapp-admin.onrender.com'], credentials: true }));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use('/quiz', router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
    await connectDB();
    console.log(`Server started on port ${PORT}`);
});
