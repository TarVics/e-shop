import {ProductType} from "../interface";

export interface SummaryDbType {
    home: {
        collectionLarge: Array<string>;
        collectionNormal: Array<string>;
    }
    deals: {
        collectionColumn: string;
        products: Array<ProductType>
    }
    hot: {
        collectionLarge: string;
        collectionNormal: Array<string>;
    }
    latest: {
        collectionColumn: string;
        products: Array<ProductType>;
    }
    picked: Array<ProductType>;
    createdAt: string;
    changedAt: string;
}

export interface SummaryType {
    home: {
        collectionLarge: Array<string>;
        collectionNormal: Array<string>;
    }
    deals: {
        collectionColumn: string;
        products: Array<ProductType>
    }
    hot: {
        collectionLarge: string;
        collectionNormal: Array<string>;
    }
    latest: {
        collectionColumn: string;
        products: Array<ProductType>;
    }
    picked: Array<ProductType>;
    createdAt: string;
    changedAt: string;
}