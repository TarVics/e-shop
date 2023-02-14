import {I18nString} from "./I18n.type";

export interface CollectionDbType {
    id: string;
    name: I18nString;
    description: I18nString | null;
    isHot: boolean;
    banner: {
        column: string | null;
        large: string | null;
        normal: string | null;
        wide: string | null;
    },
    createdAt: string;
    changedAt: string;
}

export interface CollectionType {
    id: string;
    name: string;
    description: string | null;
    isHot: boolean;
    banner: {
        column: string | null;
        large: string | null;
        normal: string | null;
        wide: string | null;
    },
    createdAt: string;
    changedAt: string;
}