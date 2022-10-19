const WORDS = ["hello", "world", "pilot", "snake", "dragon"];

export const createRoom = async (roomId: string) => {
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];

  const scrambledWord = word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};
