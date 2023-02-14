import {I18nString} from "./I18n.type";

export interface CategoryDbType {
    id: string;
    parent: string | null;
    collection: string | null;
    name: I18nString;
    banner: {
        image: string;
        name: I18nString | null;
    } | null;
    createdAt: string;
    changedAt: string;
}

export interface CategoryType {
    id: string;
    parent: string | null;
    children: Array<string>;
    collection: string | null;
    name: string;
    banner: {
        image: string;
        name: string | null;
    } | null;
    createdAt: string;
    changedAt: string;
}

export interface CategoryTreeType extends CategoryType {
    parentCategory: CategoryTreeType | null;
    childCategories: Array<CategoryTreeType>;
}