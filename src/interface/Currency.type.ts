import {I18nString} from "./I18n.type";

export interface CurrencyDbType {
    id: string;
    name: string;
    sign: string;
    tail: I18nString | null;
    rate: number;
    createdAt: string;
    changedAt: string;
}

export interface CurrencyType {
    id: string;
    name: string;
    sign: string;
    tail: string | null;
    rate: number;
    createdAt: string;
    changedAt: string;
}