import {I18nString} from "./I18n.type";
import {ApiObject} from "./ApiObject.type";

export interface ApiCurrencyType<ApiString> extends ApiObject {
    name: string;
    sign: string;
    tail: ApiString | null;
    rate: number;
}

export type CurrencyDbType = ApiCurrencyType<I18nString>;
export type CurrencyType = ApiCurrencyType<string>;
