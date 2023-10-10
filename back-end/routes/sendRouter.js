import { Router } from 'express';
import dgram from 'node:dgram';
import { Buffer } from 'node:buffer';

export const sendRouter = Router();

sendRouter.post('/', async (req, res) => {
  const {ip, port, message} = req.body;

  if(!ip || !port || !message) {
    return res.sendStatus(400);
  }

  const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
  if(!ipv4Regex.test(ip)) {
    return res.status(400).json({ message: `Invalid ip address` });
  }

  if(isNaN(port) || port > 65535 || port < 1 || !Number.isInteger(+port)) {
    return res.status(400).json({ message: `Invalid port value` });
  }


  const udpMessage = Buffer.from(message);
  const client = dgram.createSocket('udp4');

  client.send(udpMessage, port, ip, (err) => {
    client.close();

    // ToDo: need to do error code checking here for connection refused.
    // ToDo: Even more, might need to have a standard of sending error messages from the server and the client receiving and parsing them
    // Is err.code too much information to send to the client? Need to research that a bit more
    // https://nodejs.org/api/errors.html#errorcode
    if(err) {
      console.log(err);
      return res.status(400).json({ error: `${err.code}` });
    };
    
  })

  return res.sendStatus(200);
});