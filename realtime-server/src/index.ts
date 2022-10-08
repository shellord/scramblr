import { WebSocketServer } from 'ws';

const PORT = Number(process.env.WEBSOCKET_PORT) || 8080;

const wss = new WebSocketServer({
  port: PORT,
});

wss.on('connection', (ws) => {
  console.log('connected');

  ws.on('message', (message) => {
    console.log('received: %s', message);
  });

  ws.send('something');
});
