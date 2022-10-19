type TGame = {
  id: string;
  word: string;
  scrambledWord: string;
  players: TPlayer[];
  started: boolean;
  finished: boolean;
  winner: TPlayer | null;
};

type TPlayer = {
  id: string;
  name: string;
  score: number;
  finished: boolean;
  winner: boolean;
};
