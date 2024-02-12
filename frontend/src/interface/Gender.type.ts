import {I18nString} from "./I18n.type";
import {ApiObject} from "./ApiObject.type";

export interface ApiGenderType<ApiString> extends ApiObject {
    name: ApiString;
}

export type GenderDbType = ApiGenderType<I18nString>;
export type GenderType = ApiGenderType<string>;
