import {ApiDate, ApiKey} from "./Common.type";

export interface ApiObject {
    id: ApiKey;
    createdAt: ApiDate;
    changedAt: ApiDate;
}

export type ApiObjectPost<T> = Omit<T, 'id' | 'createdAt' | 'changedAt'>;
