import {ApiObject} from "./ApiObject.type";
import {I18nString} from "./I18n.type";

export interface ApiBrandType<ApiString> extends ApiObject {
    name: ApiString;
}

export type BrandDbType = ApiBrandType<I18nString>
export type BrandType = ApiBrandType<string>
