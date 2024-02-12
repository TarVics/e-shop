import React, { FC } from "react";

import { IButtonProps } from "./props.type";

const CancelButton: FC<IButtonProps> = (
  {
    children,
    className,
    onClick,
    disabled
  }) => {
  return (
    <button
      className={className ? "cancel-btn " + className : "cancel-btn"}
      role={onClick ? "button" : "none"}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { CancelButton };
