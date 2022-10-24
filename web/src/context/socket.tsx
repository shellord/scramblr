import React, { PropsWithChildren } from "react";
import { isJson, randomUID } from "../lib/utils";
import { createEventEmitter } from "ts-events-emitter";
import type { TSocketEvents, TMessage } from "../../../common/types";

type SocketContextType = {
  socket: WebSocket | null;
  listener: typeof listener;
};

type Props = { url: string; reconnectInterval?: number };

const listener = createEventEmitter<TSocketEvents>();

const initialSocketContext: SocketContextType = {
  socket: null,
  listener: listener,
};

const SocketContext =
  React.createContext<SocketContextType>(initialSocketContext);

export const useSocket = () => {
  return React.useContext(SocketContext);
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
