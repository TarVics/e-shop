import {I18nString} from "./I18n.type";
import {ApiObject} from "./ApiObject.type";

export interface ApiColorType<ApiString> extends ApiObject {
    name: ApiString;
    color: string;
}

export type ColorDbType = ApiColorType<I18nString>;
export type ColorType = ApiColorType<string>;
