import { Router } from 'express';
import dgram from 'node:dgram';
import { io } from '../index.js';

export const receiveRouter = Router();

// ToDo: only 1 socket can be run per instance of udp-visualizer, maybe something to change in the future
let udpSocket;

receiveRouter.post('/start', async (req, res) => {
  const { port } = req.body;

  if(isNaN(port) || port > 65535 || port < 1 || !Number.isInteger(+port)) {
    return res.status(400).json({ message: `Invalid port value` });
  }

  udpSocket = dgram.createSocket('udp4');

  udpSocket.on('error', (err) => {
    try {
      udpSocket.close();
    } catch (error) {
      if(error.code === 'ERR_SOCKET_DGRAM_NOT_RUNNING') {
        udpSocket.bind(port);
      }
    }

    if(err.code === 'EADDRINUSE') {
      res.status(400).json({ message: `Port: ${port} already in use` });
    } else {
      console.log(err);
      res.sendStatus(500);
    }
  });

  udpSocket.on('message', (msg, rinfo) => {
    io.emit('msg', msg.toString());
  });

  udpSocket.on('listening', () => {
    res.sendStatus(200);
  });

  udpSocket.bind(port);
});

receiveRouter.post('/stop', async (req, res) => {
  try {
    if(udpSocket) {
      udpSocket.close();
    }
    res.sendStatus(200);
  } catch (err) {
    if(err.code === 'ERR_SOCKET_DGRAM_NOT_RUNNING') {
      // ToDo: need to determine if this is a valid response for this error code
      res.sendStatus(200);
    } else {
      console.log(err);
      res.sendStatus(500);
    }
  }
});
