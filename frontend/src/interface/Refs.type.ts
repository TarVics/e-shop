import {
  BrandType,
  CategoryType,
  CollectionType,
  ColorType,
  CurrencyType,
  GenderType, ModelType,
  PaymentMethodType, ShippingMethodType,
  SizeType, SummaryType
} from ".";
import { OrderStateType } from "./OrderState.type";

export interface RefsType {
  brands: Array<BrandType>;
  categories: Array<CategoryType>;
  collections: Array<CollectionType>;
  colors: Array<ColorType>;
  currencies: Array<CurrencyType>;
  genders: Array<GenderType>;
  models: Array<ModelType>;
  orderStates: Array<OrderStateType>;
  paymentMethods: Array<PaymentMethodType>;
  shippingMethods: Array<ShippingMethodType>;
  sizes: Array<SizeType>;
  summary: SummaryType | null;
}
