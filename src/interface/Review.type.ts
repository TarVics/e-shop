import {I18nString} from "./I18n.type";

export interface ReviewDbType {
    id: string;
    product: string;
    author: string;
    email: string;
    text: I18nString;
    rating: number;
    createdAt: string;
    changedAt: string;
}

export interface ReviewType {
    id: string;
    product: string;
    author: string;
    email: string;
    text: string;
    rating: number;
    createdAt: string;
    changedAt: string;
}