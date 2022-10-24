export const isJson = (message: string) => {
  try {
    JSON.parse(message);
    return true;
  } catch (error) {
    return false;
  }
};

export const randomUID = () => {
  return Math.random().toString(36).substring(2, 15);
};
