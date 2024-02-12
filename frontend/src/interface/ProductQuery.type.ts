import {I18nLocale} from "./I18n.type";
import {PageTakeEnum, SortOrderEnum, SortKindEnum} from "../enum";

export interface ProductQueryType {
    lang: I18nLocale;
    // currency: ApiRef;
    take: PageTakeEnum;
    page: number;
    sort: SortKindEnum;
    order: SortOrderEnum;
    wide?: boolean;
    sale?: boolean;
    query: string | null;
    category: string | null;
    collection: string | null;
    colors: string | null;
    sizes: string | null;
    brands: string | null;
    min: string | null;
    max: string | null;
    genders: string | null;
}
