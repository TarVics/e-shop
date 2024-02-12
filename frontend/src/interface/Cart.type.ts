import { CartItemType, PostCartItemType } from "./CartItem.type";
import { ApiUid } from "./Common.type";
// import {ApiObject, ApiObjectPost} from "./ApiObject.type";

// export interface CartDbType extends ApiObject { }
//
// export interface CartType extends ApiObject {
//     uid: string;
//     total: number;
//     items: Array<CartItemType>;
// }
//
// export type CartPostType = ApiObjectPost<CartType>;

export interface PostCartType {
  uid?: ApiUid;
  items: Array<PostCartItemType>;
}

export interface CartType {
  uid: ApiUid;
  total: number;
  items: Array<CartItemType>;
}
