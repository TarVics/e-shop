import React, {FC} from 'react';

import css from "./StarsRating.module.css"
import {Rating} from "..";

export interface IStarsRatingProps {
    value: number;
    showValue?: boolean;
    text?: string;
}

const StarsRating: FC<IStarsRatingProps> = ({value, showValue, text}) => {

    return (
        <>
            {showValue && value ? <span className={css.text}>{value}</span> : null}
            {<Rating
                stop={5}
                emptySymbol={css.Rating + " fa fa-star-o"}
                fullSymbol={css.Rating + " fa fa-star"}
                fractions={4}
                initialRating={value * 0.5}
                readonly={true}
                className={css.text}
            />}
            {text ? <span className={css.text}>{text}</span> : null}
        </>
    );
};

export {StarsRating}