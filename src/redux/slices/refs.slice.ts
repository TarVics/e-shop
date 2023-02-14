import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {CurrencyType, I18nEncode, RefsType} from "../../interface";
import {refsService} from "../../services";

interface RefsStateType extends RefsType {
    activeCurrency: CurrencyType | null;
    loading: boolean;
    error: string | null;
}

const initialState: RefsStateType = {
    activeCurrency: null,
    brands: [],
    categories: [],
    collections: [],
    colors: [],
    currencies: [],
    genders: [],
    sizes: [],
    loading: false,
    error: null,
}

const loadRefs = createAsyncThunk<RefsType, I18nEncode>(
    'refsSlice/loadRefs',
    async (encode, {rejectWithValue}) => {
        try {
            return await refsService.load(encode);
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

const refsSlice = createSlice({
    name: 'refsSlice',
    initialState,
    reducers: {
        setActiveCurrency: (state, action: PayloadAction<CurrencyType>) => {
            state.activeCurrency = action.payload;
            localStorage.setItem('currency', state.activeCurrency.name);
        },
    },
    extraReducers: builder =>
        builder
            .addCase(loadRefs.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(loadRefs.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(loadRefs.fulfilled, (state, action) => {
                state.loading = false;
                const refs = action.payload as RefsType;
                Object.assign(state, refs);
                const currency = localStorage.getItem('currency') || 'UAH';
                state.activeCurrency = refs.currencies.find(item => item.name === currency) || refs.currencies[0];
            })
});

const {reducer: refsReducer, actions: {setActiveCurrency}} = refsSlice;

const refsActions = {
    loadRefs,
    setActiveCurrency
}

export {refsReducer, refsActions}