import { axiosService } from "./axios.service";
import { apiConfig } from "../configs";

import {
  ApiUid,
  CartItemType,
  CartType,
  I18nLocale,
  PostCartItemType,
  PostCartType,
  ProductType
} from "../interface";

export const cartsService = {

  getCartUid(): ApiUid | null {
    return window?.localStorage.getItem("cart");
  },

  setCartUid(uid: ApiUid): void {
    window?.localStorage?.setItem("cart", uid);
  },

  resetCart(): void {
    window?.localStorage.removeItem("cart");
  },

  async putCart(cart: PostCartType, lang: I18nLocale): Promise<CartType> {
    const { data } = await axiosService.put<CartType>(
      apiConfig.uri.carts({ lang }), cart);

    this.setCartUid(data.uid);

    return data;
  },

  async postCart(cart: PostCartType, lang: I18nLocale): Promise<CartType> {
    const { data } = await axiosService.post<CartType>(
      apiConfig.uri.carts({ lang }), cart);

    this.setCartUid(data.uid);

    return data;
  },

  async loadCart(lang: I18nLocale): Promise<CartType | null> {
    const uid = this.getCartUid();
    if (!uid) return null;

    const { data } = await axiosService.get<CartType>(
      apiConfig.uri.carts({ uid, lang }));

    return data;
  },

  async deleteItem(
    cart: CartType,
    item: CartItemType,
    lang: I18nLocale
  ): Promise<CartType> {
    const cartNew: PostCartType = {
      uid: cart.uid,
      items: cart.items
        .filter(cartItem => cartItem.product.uid !== item.product.uid)
        .map(cartItem => ({
          product: cartItem.product.uid,
          quantity: cartItem.quantity
        }))
    };

    return cart.uid ?
      this.putCart(cartNew, lang) :
      this.postCart(cartNew, lang);
  },

  async putProduct(
    cart: CartType | null,
    product: ProductType,
    quantity: number,
    append: boolean,
    lang: I18nLocale
  ): Promise<CartType> {
    const items: Array<PostCartItemType> = [];
    const itemsPrev: Array<CartItemType> = cart?.items || [];
    let found = false;

    itemsPrev.forEach(cartItem => {
      if (cartItem.product.uid === product.uid) {
        found = true;

        if (append && cartItem.quantity + quantity > 0) {
          items.push({ product: cartItem.product.uid, quantity: cartItem.quantity + quantity });
        } else if (!append && quantity > 0) {
          items.push({ product: cartItem.product.uid, quantity });
        }
      } else {
        items.push({ product: cartItem.product.uid, quantity: cartItem.quantity });
      }
    });

    if (!found && quantity > 0) {
      items.push({ product: product.uid, quantity });
    }

    return cart?.uid ?
      this.putCart({ uid: cart.uid, items }, lang) :
      this.postCart({ items }, lang);
  }

};
