import express from 'express';
import 'dotenv/config';
import { sendRouter } from './routes/sendRouter.js';
import { receiveRouter } from './routes/receiveRouter.js';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const PORT = process.env.UDP_VISUALIZER_BACKEND_PORT || 8080;

const app = express();
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(express.json());
app.use(cors());

app.use('/send', sendRouter);
app.use('/receive', receiveRouter);

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on port ${PORT}`);
});
