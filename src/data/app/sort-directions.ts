import {SortDirectionType} from "../../interface";
import {SortDirectionEnum} from "../../enum";

export const sortDirections: Array<SortDirectionType> = [
    {
        id: SortDirectionEnum.ascend,
        name: {"en-US": "Ascend sorting", "uk-UA": "Сортування за зростанням"},
    },
    {
        id: SortDirectionEnum.descend,
        name: {"en-US": "Descend sorting", "uk-UA": "Сортування за спаданням"},
    },
]
