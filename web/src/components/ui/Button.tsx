import React, { PropsWithChildren } from "react";
import clsx from "clsx";

type Props = {
  variant?: "primary" | "secondary" | "tertiary";
  onClick?: () => void;
};

const Button: React.FC<PropsWithChildren<Props>> = ({
  variant,
  onClick,
  children,
}) => {
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    secondary: "bg-gray-500 hover:bg-gray-700 text-white",
    tertiary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  };

  return (
    <button
      onClick={onClick}
      className={clsx("p-4", variantClasses[variant || "primary"])}
    >
      {children}
    </button>
  );
};

export default Button;
