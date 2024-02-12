import {SortOrderType} from "../../interface";
import {SortOrderEnum} from "../../enum";

export const sortOrders: Array<SortOrderType> = [
    {
        id: SortOrderEnum.ASC,
        name: {"en-US": "Ascend sorting", "uk-UA": "Сортування за зростанням"},
    },
    {
        id: SortOrderEnum.DESC,
        name: {"en-US": "Descend sorting", "uk-UA": "Сортування за спаданням"},
    },
]
