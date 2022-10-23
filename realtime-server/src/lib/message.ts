import type { TMessageType } from "../../../common/types";

const createMessage = (type: TMessageType, message: unknown): string => {
  return JSON.stringify({ type, message });
};

export default createMessage;
