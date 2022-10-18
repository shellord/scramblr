import React, { PropsWithChildren } from "react";

type SocketContextType = { socket: WebSocket | null };

const initialSocketContext: SocketContextType = { socket: null };

const SocketContext =
  React.createContext<SocketContextType>(initialSocketContext);

export const useSocket = () => {
  return React.useContext(SocketContext);
};

const connect = (url: string) => {
  const ws = new WebSocket(url);
  return ws;
};

const SocketProvider: React.FC<PropsWithChildren<{ url: string }>> = ({
  children,
  url,
}) => {
  const [socket, setSocket] = React.useState<WebSocket | null>(null);

  React.useEffect(() => {
    let ws: WebSocket | null;

    if (typeof window !== "undefined" && !socket) {
      ws = connect(url);

      ws.onopen = () => {
        console.log("Connected to websocket server");
        setSocket(ws);
      };

      ws.close = () => {
        console.log("Disconnected from websocket server");
        setSocket(null);
      };

      ws.onmessage = (event) => {
        if (process.env.NODE_ENV === "development") {
          console.log("Received message from websocket server", event.data);
        }
      };
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
