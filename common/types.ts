export type TGame = {
  id: string;
  word: string;
  scrambledWord: string;
  players: TPlayer[];
  started: boolean;
  finished: boolean;
  winner: TPlayer | null;
  timer: number;
  admin: string | null;
};

export type TPublicGame = Omit<TGame, "word">;

export type TPlayer = {
  id: string;
  name: string;
  score: number;
  finished: boolean;
  winner: boolean;
};

export type TMessageType = "GAME_CREATED" | "GAME_UPDATED";

export type TMessage = {
  type: TMessageType;
  message: unknown;
};
