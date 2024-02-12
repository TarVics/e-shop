import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CartItemType, CartType, I18nLocale, ProductType } from "../../interface";
import { cartsService } from "../../services";
import { getErrorObject } from "../../utils";
import { i18nData } from "../../data";

interface BaseStateType {
  loading: boolean;
  error: object;
}

interface CartsStateType extends BaseStateType {
  cart: CartType;
}

const initialState: Partial<CartsStateType> = {};

const loadCart = createAsyncThunk<CartType | null, { lang: I18nLocale }>(
  "cartsSlice/loadCart",
  async ({ lang }, { rejectWithValue }) => {
    try {
      return await cartsService.loadCart(lang);
    } catch (e) {
      return rejectWithValue(getErrorObject(e as Error));
    }
  }
);

interface PutCartItemPropsType {
  product: ProductType;
  quantity: number;
  append: boolean;
  lang: I18nLocale;
}

const putCartItem = createAsyncThunk<CartType | null, PutCartItemPropsType>(
  "cartsSlice/putCartItem",
  async (props, { getState, rejectWithValue }) => {
    try {
      const { cartsReducer: state } =
        getState() as { cartsReducer: Partial<CartsStateType> };

      return await cartsService.putProduct(
        state.cart || null,
        props.product,
        props.quantity,
        props.append,
        props.lang
      );
    } catch (e) {
      return rejectWithValue(getErrorObject(e as Error));
    }
  }
);

interface DeleteCartItemPropsType {
  lang: I18nLocale;
  item: CartItemType;
}

const deleteCartItem = createAsyncThunk<CartType | null, DeleteCartItemPropsType>(
  "cartsSlice/deleteCartItem",
  async ({ lang, item }, { getState, rejectWithValue }) => {
    try {
      const { cartsReducer: state } =
        getState() as { cartsReducer: Partial<CartsStateType> };

      return state.cart ? await cartsService.deleteItem(state.cart, item, lang) : null;
    } catch (e) {
      return rejectWithValue(getErrorObject(e as Error));
    }
  }
);

const cartsSlice = createSlice({
  name: "cartsSlice",
  initialState,
  reducers: {
    resetCart: (state) => {
     cartsService.resetCart();
     state.cart = undefined;
    }
  },
  extraReducers: builder =>
    builder
      .addCase(loadCart.fulfilled, (state, action) => {
        const cart = action.payload as CartType;
        state.cart = cart ? { ...cart } : undefined;
        state.loading = false;
      })
      .addCase(putCartItem.fulfilled, (state, action) => {
        const cart = action.payload as CartType;
        state.cart = cart ? { ...cart } : undefined;
        state.loading = false;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        const cart = action.payload as CartType;
        state.cart = cart ? { ...cart } : undefined;
        state.loading = false;
      })
      .addDefaultCase((state, action) => {
        if (!action.type.startsWith("cartsSlice/")) return;

        if (action.type.endsWith("/pending")) {
          state.error = undefined;
          state.loading = true;
        } else if (action.type.endsWith("/rejected")) {
          state.error = action.payload;
          state.loading = false;
        }
      })
});

const {
  reducer: cartsReducer,
  actions: { resetCart }
} = cartsSlice;

const cartsActions = {
  loadCart,
  resetCart,
  putCartItem,
  deleteCartItem
};

export { cartsReducer, cartsActions };
