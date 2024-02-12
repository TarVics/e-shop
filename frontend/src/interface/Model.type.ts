import {I18nString} from "./I18n.type";
import {ApiObject} from "./ApiObject.type";

export interface ApiModelType<ApiString> extends ApiObject {
    name: ApiString;
}

export type ModelDbType = ApiModelType<I18nString>;
export type ModelType = ApiModelType<string>;
