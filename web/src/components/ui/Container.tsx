import React, { PropsWithChildren } from "react";
import { HiHeart } from "react-icons/hi";

const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-gray-900 h-screen">
      <div className="h-[95vh]">{children}</div>
      <div className="flex justify-center space-x-1 text-lg">
        <span className="text-white">Made with </span>
        <HiHeart color="red" size={22} />
        <span className="text-white">by saheen</span>
      </div>
    </div>
  );
};

export default Container;
