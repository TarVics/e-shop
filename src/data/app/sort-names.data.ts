import {SortKindEnum} from "../../enum";
import {SortNameType} from "../../interface";

export const sortNames: Array<SortNameType> = [
    {
        id: SortKindEnum.position,
        name: {"en-US": "Position", "uk-UA": "Позиція"},
    },
    {
        id: SortKindEnum.price,
        name: {"en-US": "Price", "uk-UA": "Ціна"},
    },
    {
        id: SortKindEnum.rating,
        name: {"en-US": "Rating", "uk-UA": "Рейтинг"},
    },
]
