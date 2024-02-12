import React from "react";

import { IButtonProps } from "./props.type";

const PrimaryButton: React.FC<IButtonProps> = (
  {
    children,
    className,
    disabled,
    onClick
  }) => {
  return (
    <button
      className={className ? "primary-btn " + className : "primary-btn"}
      role={onClick ? "button" : "none"}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { PrimaryButton };
