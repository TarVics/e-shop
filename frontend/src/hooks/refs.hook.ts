import { useMemo } from "react";
import { useAppSelector } from "./redux.hook";

import {
  ApiKey,
  BrandType,
  CategoryType,
  CollectionType,
  ColorType,
  PaymentMethodType,
  ShippingMethodType,
  SizeType
} from "../interface";
import { PaymentMethodEnum, ShippingMethodEnum } from "../enum";

import { RefsStateType } from "../redux";
import { refsService } from "../services";

export type RefsApiType = {
  getBrandById: (id: ApiKey) => BrandType | null;
  getColorById: (id: ApiKey) => ColorType | null;
  getSizeById: (id: ApiKey) => SizeType | null;
  getCategoryById: (id: ApiKey) => CategoryType | null;
  getCollectionById: (id: ApiKey) => CollectionType | null;
  getShippingMethodById: (id: ApiKey) => ShippingMethodType | null;
  getShippingMethodByValue: (value: ShippingMethodEnum) => ShippingMethodType | null;
  getPaymentMethodById: (id: ApiKey) => PaymentMethodType | null;
  getPaymentMethodByValue: (value: PaymentMethodEnum) => PaymentMethodType | null,
  getCurrencyPrice: (price: number) => number;
  getCurrencyText: (price: number) => string;
}

export type UseRefsType = {
  refs: RefsStateType;
  api: RefsApiType;
};

const useRefs: () => UseRefsType = () => {
  const refs = useAppSelector(state => state.refsReducer);

  return useMemo(() => ({
    refs,
    api: {
      getBrandById: (id: ApiKey) => refsService.getItemById<BrandType>(refs.brands, id),
      getColorById: (id: ApiKey) => refsService.getItemById<ColorType>(refs.colors, id),
      getSizeById: (id: ApiKey) => refsService.getItemById<SizeType>(refs.sizes, id),
      getCategoryById: (id: ApiKey) => refsService.getItemById<CategoryType>(refs.categories, id),
      getCollectionById: (id: ApiKey) => refsService.getItemById<CollectionType>(refs.collections, id),
      getShippingMethodById: (id: ApiKey) => refsService.getItemById<ShippingMethodType>(refs.shippingMethods, id),
      getShippingMethodByValue: (value: ShippingMethodEnum) => refs.shippingMethods.find(item => item.method === value) || null,
      getPaymentMethodById: (id: ApiKey) => refsService.getItemById<PaymentMethodType>(refs.paymentMethods, id),
      getPaymentMethodByValue: (value: PaymentMethodEnum) => refs.paymentMethods.find(item => item.method === value) || null,
      getCurrencyPrice: (price: number) => refsService.getCurrencyPrice(refs.activeCurrency, price),
      getCurrencyText: (price: number) => refsService.getCurrencyText(refs.activeCurrency, price)
    }
  }), [refs]);
};

export { useRefs };
