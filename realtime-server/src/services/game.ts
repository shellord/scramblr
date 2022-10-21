import type { TGame, TPublicGame } from "../../../common/types";

const WORDS = [
  "hello",
  "world",
  "pilot",
  "snake",
  "dragon",
  "baloon",
  "ghost",
  "banana",
];

const Game: TGame = {
  id: "",
  word: "",
  scrambledWord: "",
  players: [],
  started: false,
  finished: false,
  winner: null,
  timer: 0,
  admin: null,
};

const games = new Map<string, TGame>();

export const createGame = (): TPublicGame => {
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];
  const roomId = Math.round(Math.random() * 1e5);

  const scrambledWord = word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  const game = {
    ...Game,
    id: roomId.toString(),
    timer: 60,
    scrambledWord,
  };

  games.set(roomId.toString(), game);

  return {
    id: game.id,
    scrambledWord: game.scrambledWord,
    players: game.players,
    started: game.started,
    finished: game.finished,
    winner: game.winner,
    timer: game.timer,
    admin: game.admin,
  };
};

export const setAdmin = (roomId: string, adminId: string) => {
  const game = games.get(roomId);
  if (!game) return;
  game.admin = adminId;
};
