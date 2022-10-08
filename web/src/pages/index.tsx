import React from 'react';
import { NextPage } from 'next';
import useSocket from '../hooks/useSocket';

const Home: NextPage = () => {
  const socket = useSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!);

  React.useEffect(() => {
    if (!socket) return;
    socket.onmessage = (event) => {
      console.log(event.data);
    };
    socket.send('Hello from the client!');
  }, [socket]);

  return (
    <div>
      <button
        onClick={() => {
          socket?.send('ss');
        }}
      >
        dsf
      </button>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
