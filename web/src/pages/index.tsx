import React from 'react';
import { NextPage } from 'next';
import { SocketContext } from '../context/socket';

const Home: NextPage = () => {
  const socket = React.useContext(SocketContext);

  React.useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      console.log(event.data);
    };
    socket.send('Hello from the client!');
  });

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
