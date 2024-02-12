import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { I18nLocale, OrderPostType, OrderType } from "../../interface";
import { ordersService } from "../../services";
import { cartsActions } from "./carts.slice";
import { getErrorObject } from "../../utils";

interface BaseStateType {
  loading: boolean;
  error: object;
}

interface OrdersStateType extends BaseStateType {
  order: OrderType;
}

const initialState: Partial<OrdersStateType> = {};

const createOrder = createAsyncThunk<OrderType, { order: OrderPostType; lang: I18nLocale }>(
  "ordersSlice/createOrder",
  async ({ order, lang }, { rejectWithValue, dispatch, getState }) => {
    try {
      const resultOrder: OrderType = await ordersService.createOrder(order, { lang });

      dispatch(cartsActions.resetCart());

      return resultOrder;
    } catch (e) {
      return rejectWithValue(getErrorObject(e as Error));
    }
  }
);

const ordersSlice = createSlice({
  name: "ordersSlice",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        const order = action.payload as OrderType;
        state.order = { ...order };
        state.loading = false;
      })
      .addDefaultCase((state, action) => {
        if (!action.type.startsWith("ordersSlice/")) return;

        if (action.type.endsWith("/pending")) {
          state.error = undefined;
          state.loading = true;
        } else if (action.type.endsWith("/rejected")) {
          state.error = action.payload;
          state.loading = false;
        }
      })
});

const { reducer: ordersReducer } = ordersSlice;

const ordersActions = {
  createOrder
};

export { ordersReducer, ordersActions };
