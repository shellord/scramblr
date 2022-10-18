import React from "react";
import { NextPage } from "next";
import Test from "../components/Test";
import { useSocket } from "../context/socket";

const Home: NextPage = () => {
  const { socket } = useSocket();

  return (
    <div>
      <Test />
      <button
        onClick={() => {
          socket?.send("ss");
        }}
      >
        Send
      </button>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
