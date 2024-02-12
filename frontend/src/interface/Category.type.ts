import {I18nString} from "./I18n.type";
import {ApiRef} from "./Common.type";
import {ApiObject} from "./ApiObject.type";

export interface ApiCategoryType<ApiString> extends ApiObject {
    // parent: ApiRef | null;
    // collection: ApiRef | null;
    // name: ApiString;
    // banner: {
    //     image: string;
    //     name: ApiString | null;
    // } | null;
    readonly name: ApiString;
    readonly parentId: ApiRef | null;
    readonly collectionId: ApiRef | null;
    readonly bannerImage: string;
    readonly bannerName: ApiString | null;
    readonly children: Array<ApiCategoryType<ApiString>>;
}

// export type CategoryDbType = ApiCategoryType<I18nString>;
//
// export interface CategoryType extends ApiCategoryType<string> {
//     children: Array<ApiRef>;
// }
//
// export interface CategoryTreeType extends CategoryType {
//     parentCategory: CategoryTreeType | null;
//     childCategories: Array<CategoryTreeType>;
// }

export type CategoryTypeDbType = ApiCategoryType<I18nString>;
export type CategoryType = ApiCategoryType<string>;
