// import { I18nString } from "./I18n.type";
// import { ApiDate, ApiRef } from "./Common.type";
// import { ApiObject } from "./ApiObject.type";
// import { CategoryType } from "./Category.type";
// import { ModelType } from "./Model.type";
// import { CollectionType } from "./Collection.type";
// import { BrandType } from "./Brand.type";
// import { GenderType } from "./Gender.type";
import { ProductImageType } from "./ProductImage.type";
import { ApiRef, ApiUid } from "./Common.type";

// export interface ApiProductQuickType<ApiString> extends ApiObject {
//     name: ApiString;
//     color?: ApiRef;
//     size?: ApiRef;
//     quantity: number;
// }

export interface ProductQuickType {
    uid: ApiUid;
    name: string;
    colorId?: ApiRef;
    sizeId?: ApiRef;
    quantity: number;
}

// export interface ApiProductType<ApiString> extends ApiProductQuickType<ApiString> {
    // category: ApiRef;
    // model: ApiRef | null;
    // collection: ApiRef | null;
    // brand: ApiRef;
    // gender: ApiRef | null;
    // price: number;
    // sale: number | null;
    // saleStop: ApiDate | null;
    // rating: number | null;
    // isNew: boolean;
    // image: {
    //     column: string;
    //     detail: Array<{
    //         main: string;
    //         thumb: string;
    //     }>
    // };
    // brief: ApiString;
    // description: ApiString;
    // details: ApiString;
// }
//
// export type ProductQuickDbType = ApiProductQuickType<I18nString>;
// export type ProductDbType = ApiProductType<I18nString>;
//
// export interface ProductQuickType extends ApiProductQuickType<string> {
// }
//
// export interface ProductType extends ApiProductType<string> {
//     isHot?: boolean;
// }
//
// export interface ProductDetailType extends ProductType {
//     byModel: Array<ProductQuickType>;
// }

export interface ProductType {
    uid: ApiUid;
    name: string;
    colorId: ApiRef;
    sizeId: ApiRef;
    quantity: number;
    categoryId: ApiRef;
    modelId: ApiRef;
    collectionId: ApiRef;
    brandId: ApiRef;
    genderId: ApiRef;
    price: number;
    sale: number;
    saleStop: Date;
    rating: number;
    isNew: boolean;
    brief: string;
    description: string;
    details: string;
    imageColumn: string;
    images: ProductImageType[];
    byModel?: Array<ProductQuickType>;
}