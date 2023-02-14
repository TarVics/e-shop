import {ProductType} from "./Product.type";
import {I18nEncode} from "./I18n.type";
import {PageLimitEnum, SortDirectionEnum, SortKindEnum} from "../enum";

export interface ProductListType {
    page: number,
    results: Array<ProductType>,
    total_pages: number,
    total_results: number
}

export interface ProductListQueryType {
    encode: I18nEncode;
    currency: string;
    page: number;
    direction: SortDirectionEnum;
    query: string|null;
    category: string|null;
    collection: string|null;
    colors: string|null;
    sizes: string|null;
    brands: string|null;
    min: string|null;
    max: string|null;
    genders: string|null;
    sort: SortKindEnum;
    show: PageLimitEnum;
}