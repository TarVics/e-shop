import { ApiRef, ApiUid } from "./Common.type";
import { CartType } from "./Cart.type";
import { I18nLocale } from "./I18n.type";
// import { ApiObject, ApiObjectPost } from "./ApiObject.type";
// import { UserLoginProps } from "./User.type";
// import { PaymentMethodEnum, ShippingMethodEnum } from "../enum";
//
// export interface OrderType extends ApiObject {
//   user: ApiRef | UserLoginProps;
//   zip_code: string | null;
//   country: string | null;
//   city: string | null;
//   address: string | null;
//   shipping: ShippingMethodEnum;
//   payments: PaymentMethodEnum;
//   cart: ApiUid;
// }
//
// export type OrderPostType = ApiObjectPost<OrderType>;

export interface OrderPostType {
  zipCode: string | null;
  country: string | null;
  city: string;
  address: string;
  shippingId: ApiRef;
  paymentId: ApiRef;
  cart: ApiUid;
}

export interface OrderType {
  uid: ApiUid;
  zipCode: string;
  country: string;
  city: string;
  address: string;
  shippingId: ApiRef;
  paymentId: ApiRef;
  stateId: ApiRef;
  cart: CartType;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderQueryType {
  curr?: number;
  lang: I18nLocale;
}
