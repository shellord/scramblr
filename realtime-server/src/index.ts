import { WebSocketServer } from "ws";
import log from "./lib/log";
import * as Game from "./services/game";

const PORT = Number(process.env.PORT) || 8080;

const wss = new WebSocketServer({
  port: PORT,
});

wss.on("connection", (ws) => {
  log("connected");

  ws.on("message", (message) => {
    log(`received: ${message}`);

    switch (message.toString()) {
      case "createGame": {
        log("creating game");
        const game = Game.createGame();
        log(game);
        ws.send(JSON.stringify(game));
      }
    }
  });

  ws.send("something");
});
