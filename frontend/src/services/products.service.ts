import { AsyncAxiosResponse, axiosService } from "./axios.service";
import { apiConfig } from "../configs";

import {
  ApiUid,
  I18nLocale,
  ProductQueryType,
  ProductListType,
  ProductType
} from "../interface";

export const productsService = {

  getProductByUid(
    uid: ApiUid,
    encode: I18nLocale,
    models?: boolean
  ): AsyncAxiosResponse<ProductType> {
    return axiosService.get(
      apiConfig.uri.products(uid) +
      "?lang=" + encode +
      (models ? "&models=1" : "")
    );
  },

  loadProducts(params: ProductQueryType): AsyncAxiosResponse<ProductListType> {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([name, value]) => {
      value && searchParams.set(name, String(value));
    });

    return axiosService.get(
      apiConfig.uri.products() + "?" + searchParams.toString());
  },

  getSaleOffTime(product: ProductType): number {
    if (!product.saleStop || !product.sale) return 0;

    const countDownDate = new Date(product.saleStop).getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;

    return distance < 0 ? 0 : distance;
  },

  hasSale(product: ProductType): boolean {
    return !!(product.sale && (!product.saleStop || this.getSaleOffTime(product)));
  },

  getFinalPrice(product: ProductType): number {
    return product.sale && this.hasSale(product) ?
      product.price - (product.price * product.sale / 100) : product.price;
  }

};
