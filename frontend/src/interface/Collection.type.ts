// import {I18nString} from "./I18n.type";
// import {ApiObject} from "./ApiObject.type";
//
// export interface ApiCollectionType<ApiString> extends ApiObject {
//     name: ApiString;
//     description: ApiString | null;
//     isHot: boolean;
//     banner: {
//         column: string | null;
//         large: string | null;
//         normal: string | null;
//         wide: string | null;
//     };
// }
//
// export type CollectionDbType = ApiCollectionType<I18nString>;
// export type CollectionType = ApiCollectionType<string>;
//

import {ApiObject} from "./ApiObject.type";
import {CollectionBannerType} from "./CollectionBanner.type";

export interface CollectionType extends ApiObject {
    name: string;
    description: string;
    isHot: boolean;
    banners: CollectionBannerType[];
}
