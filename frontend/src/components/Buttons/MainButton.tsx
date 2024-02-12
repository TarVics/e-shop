import React from "react";

import { IButtonProps } from "./props.type";

const MainButton: React.FC<IButtonProps> = (
  {
    children,
    className,
    onClick,
    disabled
  }) => {
  return (
    <button
      className={className ? "main-btn " + className : "main-btn"}
      role={onClick ? "button" : "none"}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { MainButton };
