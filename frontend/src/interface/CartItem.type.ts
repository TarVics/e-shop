import { ProductType } from "./Product.type";
import { ApiUid } from "./Common.type";
// import {ApiRef} from "./Common.type";
// import {ApiObject} from "./ApiObject.type";

export interface PostCartItemType {
  product: ApiUid;
  quantity: number;
}

export interface CartItemType {
  price: number;
  quantity: number;
  product: ProductType;
}

// export interface ApiCartItemType<ApiProduct> extends ApiObject {
//     // cart: ApiRef;
//     // product: ApiProduct;
//     // quantity: number;
//     price: number;
//     quantity: number;
//     product: ProductType;
// }
//
// export type CartItemDbType = ApiCartItemType<ApiRef>;
// export type CartItemType = ApiCartItemType<ProductType>;
