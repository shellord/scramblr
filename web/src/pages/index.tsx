import React from "react";
import { NextPage } from "next";
import { useSocket } from "../context/socket";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

const Home: NextPage = () => {
  const { socket, listener } = useSocket();

  const createGameHandler = () => {
    socket?.send("createGame");
    listener.on("GAME_CREATED", (data) => {
      console.log(data);
    });
  };

  return (
    <Container>
      <div className="h-full flex justify-center items-center flex-col">
        <p className="text-white text-7xl">Scramblr</p>
        <div className="mt-10" />
        <div className="flex space-x-5">
          <Button onClick={createGameHandler}>Create Room</Button>
          <Button>Join Room</Button>
        </div>
      </div>
    </Container>
  );
};

export default Home;
