import React from "react";

import css from "./StarsRating.module.css";
import { Rating } from "..";

export interface IStarsRatingProps {
  onChange?: (value: number) => void;
  readonly?: boolean;
  showValue?: boolean;
  text?: string;
  value: number;
  style?: React.CSSProperties;
}

const StarsRating: React.FC<IStarsRatingProps> = (
  {
    value,
    showValue,
    text,
    onChange,
    style,
    readonly = true
  }
) => {

  return (
    <>
      {showValue && value && text ? <span className={css.text} style={style}>{value}</span> : null}
      {<Rating
        stop={5}
        emptySymbol={css.Rating + " fa fa-star-o"}
        fullSymbol={css.Rating + " fa fa-star"}
        fractions={4}
        initialRating={value * 0.5}
        readonly={readonly}
        className={css.text}
        style={style}
        onChange={value => onChange && onChange(value * 2)}
      />}
      {showValue && value && !text ? <span className={css.text} style={style}>{value}</span> : null}
      {text ? <span className={css.text}>{text}</span> : null}
    </>
  );
};

export { StarsRating };
