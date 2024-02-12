import { ApiUid } from "./Common.type";
import { SortOrderEnum } from "../enum";

export interface ReviewQueryType {
    product: ApiUid;
    page: number;
    order?: SortOrderEnum;
}
