import {/*ApiDate,*/ ApiRef, ProductType} from "../interface";

export interface ApiSummaryType {
    // home: {
    //     collectionLarge: Array<ApiRef>;
    //     collectionNormal: Array<ApiRef>;
    // }
    // deals: {
    //     collectionColumn: ApiRef;
    //     products: Array<ProductType>
    // }
    // hot: {
    //     collectionLarge: ApiRef;
    //     collectionNormal: Array<ApiRef>;
    // }
    // latest: {
    //     collectionColumn: ApiRef;
    //     products: Array<ProductType>;
    // }
    // picked: Array<ProductType>;
    // createdAt: ApiDate;
    // changedAt: ApiDate;
    homeCollectionLarge: Array<ApiRef>;
    homeCollectionNormal: Array<ApiRef>;
    dealsCollectionColumn: Array<ApiRef>;
    dealsProducts: Array<ProductType>;
    hotCollectionLarge: Array<ApiRef>;
    hotCollectionNormal: Array<ApiRef>;
    latestCollectionColumn: Array<ApiRef>;
    latestProducts: Array<ProductType>;
    picked: Array<ProductType>;
}

export type SummaryDbType = ApiSummaryType;
export type SummaryType = ApiSummaryType;
