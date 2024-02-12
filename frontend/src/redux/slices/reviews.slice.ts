import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ApiToken, ReviewListType, ReviewPostType, ReviewQueryType } from "../../interface";
import { reviewsService } from "../../services";
import { getErrorObject } from "../../utils";

interface BaseStateType {
  loading: boolean;
  error: object;
}

export interface ReviewListStateType extends BaseStateType {
  reviews: ReviewListType;
}

const initialState: Partial<ReviewListStateType> = {};

const loadReviews = createAsyncThunk<ReviewListType, ReviewQueryType>(
  "reviewsSlice/loadReviews",
  async (params, { rejectWithValue }) => {
    try {
      return await reviewsService.loadReviews(params);
    } catch (e) {
      return rejectWithValue(getErrorObject(e as Error));
    }
  }
);

const postReview = createAsyncThunk<
  ReviewListType,
  {
    review: ReviewPostType;
    params: ReviewQueryType;
    token?: ApiToken;
  }
>(
  "reviewsSlice/postReview",
  async ({ review, params, token }, { rejectWithValue }) => {
    try {
      return await reviewsService.postReview(review, params, token);
    } catch (e) {
      return rejectWithValue(getErrorObject(e as Error));
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviewsSlice",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(loadReviews.fulfilled, (state, action) => {
        const reviews = action.payload as ReviewListType;
        state.reviews = { ...reviews };
        state.loading = false;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        const reviews = action.payload as ReviewListType;
        state.reviews = { ...reviews };
        state.loading = false;
      })
      .addDefaultCase((state, action) => {
        if (!action.type.startsWith("reviewsSlice/")) return;

        if (action.type.endsWith("/pending")) {
          state.error = undefined;
          state.loading = true;
        } else if (action.type.endsWith("/rejected")) {
          state.error = action.payload;
          state.loading = false;
        }
      })
});

const { reducer: reviewsReducer } = reviewsSlice;

const reviewsActions = {
  loadReviews,
  postReview
};

export { reviewsReducer, reviewsActions };
