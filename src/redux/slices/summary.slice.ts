import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {I18nEncode, SummaryType} from "../../interface";
import {summaryService} from "../../services";

interface SummaryStateType extends SummaryType {
    loading: boolean,
    error: string | null
}

const initialState: Partial<SummaryStateType> = {
    loading: false,
    error: null,
}

const loadSummary = createAsyncThunk<SummaryType,I18nEncode> (
    'summarySlice/loadSummary',
    async (encode, {rejectWithValue}) => {
        try {
            return await summaryService.loadSummary(encode);
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

const summarySlice = createSlice({
    name: 'summarySlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(loadSummary.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(loadSummary.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(loadSummary.fulfilled, (state, action) => {
                const summary = action.payload as SummaryType;
                Object.assign(state, summary);
                state.loading = false;
            })
});

const {reducer: summaryReducer} = summarySlice;

const summaryActions = {
    loadSummary
}

export {summaryReducer, summaryActions}