import {BrandType, CategoryType, CollectionType, ColorType, CurrencyType, GenderType, SizeType} from ".";

export interface RefsType {
    brands: Array<BrandType>;
    categories: Array<CategoryType>;
    collections: Array<CollectionType>;
    colors: Array<ColorType>;
    currencies: Array<CurrencyType>;
    genders: Array<GenderType>;
    sizes: Array<SizeType>;
}