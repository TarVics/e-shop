import {ApiObject} from "./ApiObject.type";
import {I18nString} from "./I18n.type";

export interface ApiSizeType<ApiString> extends ApiObject {
    name: ApiString;
}

export type SizeDbType = ApiSizeType<I18nString>;
export type SizeType = ApiSizeType<string>;
