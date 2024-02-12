import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  I18nLocale,
  ProductListType,
  ProductQueryType,
  ProductType
} from "../../interface";
import { productsService } from "../../services";
import { getErrorObject } from "../../utils";

interface BaseStateType {
  loading: boolean;
  error: object;
}

interface ProductListStateType extends BaseStateType {
  products: ProductListType;
  product: ProductType;
}

const initialState: Partial<ProductListStateType> = {};

const loadProducts = createAsyncThunk<ProductListType, ProductQueryType>(
  "productsSlice/loadProducts",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await productsService.loadProducts(params);
      return data;
    } catch (e) {
      return rejectWithValue(getErrorObject(e as Error));
    }
  }
);

const getProductByUid = createAsyncThunk<
  ProductType/*ProductDetailType*/ | null, { uid: string, encode: I18nLocale, models?: boolean }
>(
  "productsSlice/getProductByUid",
  async (props, { rejectWithValue }) => {
    try {
      const { data } = await productsService.getProductByUid(props.uid, props.encode, props.models);
      return data;
    } catch (e) {
      return rejectWithValue(getErrorObject(e as Error));
    }
  }
);

const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(loadProducts.fulfilled, (state, action) => {
        const products = action.payload as ProductListType;
        state.products = { ...products };
        state.loading = false;
      })
      .addCase(getProductByUid.fulfilled, (state, action) => {
        const product = action.payload;
        state.product = product ? { ...product } : undefined;
        state.loading = false;
      })
      .addDefaultCase((state, action) => {
        if (!action.type.startsWith("productsSlice/")) return;

        if (action.type.endsWith("/pending")) {
          state.error = undefined;
          state.loading = true;
        } else if (action.type.endsWith("/rejected")) {
          state.error = action.payload;
          state.loading = false;
        }
      })
});

const { reducer: productsReducer } = productsSlice;

const productsActions = {
  loadProducts,
  getProductByUid
};

export { productsReducer, productsActions };
