import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  CurrencyType,
  I18nLocale,
  PaymentMethodType,
  RefsType,
  ShippingMethodType
} from "../../interface";
import { refsService } from "../../services";
import { getErrorObject } from "../../utils";

interface BaseStateType extends RefsType {
  loading: boolean;
  error?: object;
}

export interface RefsStateType extends BaseStateType {
  activeCurrency: CurrencyType | null;
  activePayment: PaymentMethodType | null,
  activeShipping: ShippingMethodType | null,
}

const initialState: RefsStateType = {
  activeCurrency: null,
  activePayment: null,
  activeShipping: null,
  brands: [],
  categories: [],
  collections: [],
  colors: [],
  currencies: [],
  genders: [],
  models: [],
  orderStates: [],
  paymentMethods: [],
  shippingMethods: [],
  sizes: [],
  summary: null,
  loading: false,
  error: undefined
};

const loadRefs = createAsyncThunk<RefsType, I18nLocale>(
  "refsSlice/loadRefs",
  async (encode, { rejectWithValue }) => {
    try {
      const { data } = await refsService.load(encode);
      return data;
    } catch (e) {
      return rejectWithValue(getErrorObject(e as Error));
    }
  }
);

const refsSlice = createSlice({
  name: "refsSlice",
  initialState,
  reducers: {
    setActiveCurrency: (
      state,
      action: PayloadAction<CurrencyType>
    ) => {
      state.activeCurrency = action.payload;
      localStorage.setItem("currency", state.activeCurrency.name);
    },

    setActivePayment: (
      state,
      action: PayloadAction<PaymentMethodType>
    ) => {
      state.activePayment = action.payload;
    },

    setActiveShipping: (
      state,
      action: PayloadAction<ShippingMethodType>
    ) => {
      state.activeShipping = action.payload;
    }

  },
  extraReducers: builder =>
    builder
      .addCase(loadRefs.fulfilled,(state, action) => {
        state.loading = false;
        const refs = action.payload as RefsType;
        Object.assign(state, refs);
        const currency = localStorage.getItem("currency") || "UAH";
        state.activeCurrency = refs.currencies.find(item =>
          item.name === currency) || refs.currencies[0];
        state.activePayment = refs.paymentMethods[0];
        state.activeShipping = refs.shippingMethods[0];
      })
      .addCase(loadRefs.pending, (state) => {
        state.error = undefined;
        state.loading = true;
      })
      .addCase(loadRefs.rejected, (state, action) => {
        state.error = action.payload as object;
        state.loading = false;
      })
});

const {
  reducer: refsReducer,
  actions: {
    setActiveCurrency,
    setActivePayment,
    setActiveShipping
  }
} = refsSlice;

const refsActions = {
  loadRefs,
  setActiveCurrency,
  setActivePayment,
  setActiveShipping
};

export { refsReducer, refsActions };
