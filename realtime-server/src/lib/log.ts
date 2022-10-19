const log = (message: unknown) => {
  if (process.env.NODE_ENV === "development") {
    console.log(message);
  }
};

export default log;
