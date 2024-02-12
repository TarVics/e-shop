import { PaginationMetaType } from "./PaginationMeta.type";

export interface PaginationType<T> {
    // page: number,
    // results: Array<T>,
    // total_pages: number,
    // total_results: number
    data: Array<T>,
    meta: PaginationMetaType;
}
