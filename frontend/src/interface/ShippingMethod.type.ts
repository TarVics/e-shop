import { I18nString } from "./I18n.type";
import { ApiObject } from "./ApiObject.type";
import { ShippingMethodEnum } from "../enum";

export interface ApiShippingMethodType<ApiString> extends ApiObject {
  price: number;
  name: ApiString;
  info: ApiString;
  method: ShippingMethodEnum;
}

export type ShippingMethodDbType = ApiShippingMethodType<I18nString>;
export type ShippingMethodType = ApiShippingMethodType<string>;
