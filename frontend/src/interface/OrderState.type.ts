import { I18nString } from "./I18n.type";
import { ApiObject } from "./ApiObject.type";
import { OrderStateEnum } from "../enum";

export interface ApiOrderStateType<ApiString> extends ApiObject {
  code: OrderStateEnum;
  name: ApiString;
}

export type OrderStateDbType = ApiOrderStateType<I18nString>;
export type OrderStateType = ApiOrderStateType<string>;
