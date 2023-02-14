import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {ProductListQueryType, ProductListType} from "../../interface";
import {productsService} from "../../services";

interface ProductListStateType extends ProductListType {
    loading: boolean,
    error: string | null
}

const initialState: Partial<ProductListStateType> = {
    loading: false,
    error: null,
}

const loadProducts = createAsyncThunk<ProductListType, ProductListQueryType>(
    'productsSlice/loadProducts',
    async (params, {rejectWithValue}) => {
        try {
            return productsService.loadProducts(params);
        } catch (e) {
            if (e instanceof AxiosError) {
                const error = e as AxiosError;
                return rejectWithValue(error.response?.data || error.toString())
            } else {
                return rejectWithValue((e as Error).toString())
            }
        }
    }
);

const productsSlice = createSlice({
    name: 'productsSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(loadProducts.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(loadProducts.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(loadProducts.fulfilled, (state, action) => {
                const products = action.payload as ProductListType;
                Object.assign(state, products);
                state.loading = false;
            })
});

const {reducer: productsReducer} = productsSlice;

const productsActions = {
    loadProducts
}

export {productsReducer, productsActions}