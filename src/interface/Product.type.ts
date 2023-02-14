import {I18nString} from "./I18n.type";

export interface ProductDbType {
    id: string;
    category: string;
    collection: string | null;
    brand: string;
    gender: string | null;
    name: I18nString;
    price: number;
    sale: number | null;
    saleStop: string | null;
    rating: number | null;
    isNew: boolean;
    image: {
        column: string;
        detail: Array<{
            main: string;
            thumb: string;
        }>
    };
    description: I18nString;
    details: I18nString;
    createdAt: string;
    changedAt: string;
}

export interface ProductType {
    id: string;
    category: string;
    collection: string | null;
    brand: string;
    gender: string | null;
    name: string;
    isHot?: boolean;
    price: number;
    sale: number | null;
    saleStop: string | null;
    rating: number | null;
    isNew: boolean;
    image: {
        column: string;
        detail: Array<{
            main: string;
            thumb: string;
        }>
    };
    description: string;
    details: string;
    createdAt: string;
    changedAt: string;
}