import cors from 'cors';
import express from 'express';
import { chatsRoute, messagesRoute, usersRoute } from './routes/index';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/home', usersRoute);
app.use('/chats', chatsRoute);
app.use('/messages', messagesRoute);

export default app;