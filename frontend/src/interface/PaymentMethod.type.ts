import { PaymentMethodEnum } from "../enum";
import { I18nString } from "./I18n.type";
import { ApiObject } from "./ApiObject.type";

export interface ApiPaymentMethodType<ApiString> extends ApiObject {
  name: ApiString;
  info: ApiString;
  method: PaymentMethodEnum;
}

export type PaymentMethodDbType = ApiPaymentMethodType<I18nString>;
export type PaymentMethodType = ApiPaymentMethodType<string>;
