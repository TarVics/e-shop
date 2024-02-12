import { ApiUid } from "./Common.type";
// import {ApiObject} from "./ApiObject.type";

// export interface ReviewType extends ApiObject {
//     product: ApiRef;
//     author: string;
//     email: string;
//     text: string;
//     rating: number;
// }
//
// export type ReviewPostType = Omit<ReviewType, 'id' | 'changedAt' | 'createdAt'>

export interface ReviewType {
    uid: ApiUid;
    product: ApiUid;
    author: string;
    email: string;
    text: string;
    rating: number;
    createdAt: Date;
}

export interface ReviewPostType {
    product: ApiUid;
    text: string;
    rating: number;
}

