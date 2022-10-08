import React from 'react';

const useSocket = () => {
  const [socket, setSocket] = React.useState<WebSocket | null>(null);
  const ws = React.useRef<WebSocket | null>(null);

  const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL;
  if (!WEBSOCKET_URL) {
    throw new Error('WEBSOCKET_URL is not set');
  }

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      ws.current = new WebSocket(WEBSOCKET_URL);

      ws.current.onopen = () => {
        console.log('Connected to websocket server');
        setSocket(ws.current);
      };

      ws.current.onclose = () => {
        console.log('Disconnected from websocket server');
        setSocket(null);
      };

      ws.current.onerror = (err) => {
        console.error('Error connecting to websocket server', err);
        setSocket(null);
      };

      ws.current.onmessage = (event) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('Received message from websocket server', event.data);
        }
      };
    }
    return () => {
      setSocket(null);
      ws.current?.close();
    };
  }, []);

  return socket;
};
export default useSocket;
