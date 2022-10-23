export const isJson = (message: string) => {
  try {
    JSON.parse(message);
    return true;
  } catch (error) {
    return false;
  }
};
