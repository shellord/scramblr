import { WebSocket, WebSocketServer } from "ws";
import log from "./lib/log";
import * as Game from "./services/game";
import createMessage from "./lib/message";

const PORT = Number(process.env.PORT) || 8080;

const wss = new WebSocketServer({
  port: PORT,
});

const handleUID = (uid: string, ws: WebSocket) => {
  if (!uid) {
    log("no uid");
    ws.close();
    return;
  }
};

const clients = new Map<string, WebSocket>();

wss.on("connection", (ws, req) => {
  log("connected");
  const uid = req.url?.split("/").pop() || "";
  handleUID(uid, ws);
  clients.set(uid, ws);

  ws.on("message", (message) => {
    log(`received: ${message}`);

    switch (message.toString()) {
      case "createGame": {
        log("creating game");

        const game = Game.createGame();
        Game.setAdmin(game.id, uid);

        log(game);
        ws.send(createMessage("GAME_CREATED", game));
      }
    }
  });

  ws.send("something");
});
