import {PageLimitType} from "../../interface";
import {PageTakeEnum} from "../../enum";

export const pageLimits: Array<PageLimitType> = [
    {
        id: PageTakeEnum.limit10,
        name: "10",
    },
    {
        id: PageTakeEnum.limit20,
        name: "20",
    },
    {
        id: PageTakeEnum.limit30,
        name: "30",
    },
]
