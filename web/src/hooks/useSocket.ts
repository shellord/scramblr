import React from 'react';

const useSocket = () => {
  const [socket, setSocket] = React.useState<WebSocket | null>(null);
  const hasRunOnceRef = React.useRef(false);

  let ws: WebSocket | null;

  const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL;
  if (!WEBSOCKET_URL) {
    throw new Error('WEBSOCKET_URL is not set');
  }

  React.useEffect(() => {
    if (hasRunOnceRef.current) return;
    hasRunOnceRef.current = true;

    ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => {
      console.log('Connected to websocket server');
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log('Disconnected from websocket server');
      setSocket(null);
    };

    ws.onerror = (err) => {
      console.error('Error connecting to websocket server', err);
      setSocket(null);
    };

    ws.onmessage = (event) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('Received message from websocket server', event.data);
      }
    };
    return () => {
      if (ws?.readyState === WebSocket.OPEN) {
        setSocket(null);
        ws?.close();
      }
    };
  }, []);

  return socket;
};
export default useSocket;
