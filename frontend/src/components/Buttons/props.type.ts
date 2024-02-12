import { MouseEventHandler, ReactNode } from "react";

export interface IButtonProps {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
