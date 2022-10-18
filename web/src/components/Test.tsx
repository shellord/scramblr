import React from "react";
import { useSocket } from "../context/socket";

const Test = () => {
  const { socket } = useSocket();

  React.useEffect(() => {
    if (!socket) return;
    socket.onmessage = (event) => {
      console.log(event.data);
    };
  }, [socket]);

  return <div>Test</div>;
};

export default Test;
