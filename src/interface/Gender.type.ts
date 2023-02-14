import {I18nString} from "./I18n.type";

export interface GenderDbType {
    id: string;
    name: I18nString;
    createdAt: string;
    changedAt: string;
}

export interface GenderType {
    id: string;
    name: string;
    createdAt: string;
    changedAt: string;
}