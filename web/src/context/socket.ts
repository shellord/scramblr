import React from 'react';

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL;
if (!WEBSOCKET_URL) {
  throw new Error('WEBSOCKET_URL is not set');
}

export let ws: WebSocket | null = null;

if (typeof window !== 'undefined') {
  ws = new WebSocket(WEBSOCKET_URL);

  ws.onopen = () => {
    console.log('Connected to websocket server');
  };

  ws.onmessage = (event) => {
    console.log('Received message from websocket server', event.data);
  };
}

export const SocketContext = React.createContext<WebSocket | null>(ws);
