import React from 'react';

const useSocket = (url: string) => {
  const [socket, setSocket] = React.useState<WebSocket | null>(null);
  const hasRunOnceRef = React.useRef(false);

  let ws: WebSocket | null;

  React.useEffect(() => {
    if (hasRunOnceRef.current || !url) return;
    hasRunOnceRef.current = true;

    ws = new WebSocket(url);

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
  }, [url]);

  return socket;
};
export default useSocket;
