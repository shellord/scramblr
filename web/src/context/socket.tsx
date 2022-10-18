import React, { PropsWithChildren } from "react";

type SocketContextType = { socket: WebSocket | null };

const initialSocketContext: SocketContextType = { socket: null };

const SocketContext =
  React.createContext<SocketContextType>(initialSocketContext);

export const useSocket = () => {
  return React.useContext(SocketContext);
};

const SocketProvider: React.FC<PropsWithChildren<{ url: string }>> = ({
  children,
  url,
}) => {
  let ws: WebSocket | null = null;

  const [socket, setSocket] = React.useState<WebSocket | null>(null);

  const connect = () => {
    ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("Connected to websocket server");
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log("Disconnected from websocket server");
      setSocket(null);
    };

    ws.onmessage = (event) => {
      if (process.env.NODE_ENV === "development") {
        console.log("Received message from websocket server", event.data);
      }
    };
  };

  React.useEffect(() => {
    if (typeof window !== "undefined" && !socket) {
      connect();
    }

    return () => {
      if (ws?.readyState === WebSocket.OPEN) {
        ws.close();
        setSocket(null);
      }
    };
  }, [socket, setSocket]);

  const value = {
    socket,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
