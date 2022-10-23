import React, { PropsWithChildren } from "react";
import EventEmitter from "events";
import type { TMessage } from "../../../common/types";
import { isJson } from "../lib/utils";

type SocketContextType = {
  socket: WebSocket | null;
  listener: EventEmitter;
};
type Props = { url: string; reconnectInterval?: number };

const initialSocketContext: SocketContextType = {
  socket: null,
  listener: new EventEmitter(),
};

const SocketContext =
  React.createContext<SocketContextType>(initialSocketContext);

export const useSocket = () => {
  return React.useContext(SocketContext);
};

const listener = new EventEmitter();

const randomUID = () => {
  return Math.random().toString(36).substring(2, 15);
};

const SocketProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  url,
  reconnectInterval,
}) => {
  const [socket, setSocket] = React.useState<WebSocket | null>(null);
  let ws: WebSocket | null;

  const connect = React.useCallback(() => {
    if (!socket) {
      ws = new WebSocket(`${url}?uid=${randomUID()}`);

      ws.onopen = () => {
        console.log("Connected to websocket server");
        setSocket(ws);
      };

      ws.onclose = () => {
        console.log("Disconnected from websocket server");
        setSocket(null);
        setTimeout(connect, reconnectInterval || 1000);
      };

      ws.onmessage = (event) => {
        if (process.env.NODE_ENV === "development") {
          console.log("Received message from websocket server", event.data);
        }

        if (!isJson(event.data)) {
          return;
        }

        const data: TMessage = JSON.parse(event.data);
        listener.emit(data.type, data.message);
      };
    }
  }, [socket]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      connect();
    }

    return () => {
      if (ws?.readyState === WebSocket.OPEN) {
        ws.close();
        setSocket(null);
      }
    };
  }, []);

  const value = {
    socket,
    listener,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
