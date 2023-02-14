import {I18nString} from "./I18n.type";

export interface ColorDbType {
    id: string;
    name: I18nString;
    color: string;
    createdAt: string;
    changedAt: string;
}

export interface ColorType {
    id: string;
    name: string;
    color: string;
    createdAt: string;
    changedAt: string;
}
