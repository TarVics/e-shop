import {SortKindEnum} from "../../enum";
import {SortNameType} from "../../interface";

export const sortNames: Array<SortNameType> = [
    {
        id: SortKindEnum.POSITION,
        name: {"en-US": "Position", "uk-UA": "Позиція"},
    },
    {
        id: SortKindEnum.PRICE,
        name: {"en-US": "Price", "uk-UA": "Ціна"},
    },
    {
        id: SortKindEnum.RATING,
        name: {"en-US": "Rating", "uk-UA": "Рейтинг"},
    },
]
