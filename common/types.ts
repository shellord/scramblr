export type TGame = {
  id: string;
  word: string;
  scrambledWord: string;
  players: TPlayer[];
  started: boolean;
  finished: boolean;
  winner: TPlayer | null;
  timer: number;
};

export type TPublicGame = Omit<TGame, "word">;

export type TPlayer = {
  id: string;
  name: string;
  score: number;
  finished: boolean;
  winner: boolean;
};
