import {
    ApiToken,
    // ApiToken,
    ReviewListType,
    ReviewPostType,
    ReviewQueryType,
    ReviewType
} from "../interface";
import { apiConfig } from "../configs";
import { axiosService } from "./axios.service";

export const reviewsService = {

    async loadReviews(params: ReviewQueryType): Promise<ReviewListType> {
        const { data } = await axiosService.get<ReviewListType>(
            apiConfig.uri.reviews(), { params });

        return data;
    },

    async postReview(
        review: ReviewPostType,
        params: ReviewQueryType,
        token?: ApiToken
    ): Promise<ReviewListType> {
        const headers = token ? { "Authorization": `Bearer ${token}` } : undefined;

        await axiosService.post<ReviewType>(
            apiConfig.uri.reviews(), review, { headers });

        return this.loadReviews(params);
    }
};
