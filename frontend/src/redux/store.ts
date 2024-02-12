import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  cartsReducer,
  refsReducer,
  i18nReducer,
  // summaryReducer,
  productsReducer,
  reviewsReducer,
  ordersReducer,
  // usersReducer
} from "./slices";

const rootReducer = combineReducers({
  cartsReducer,
  i18nReducer,
  ordersReducer,
  productsReducer,
  refsReducer,
  reviewsReducer
});

const setupStore = () => configureStore({
  reducer: rootReducer
});

type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore["dispatch"]

export type {
  RootState,
  AppStore,
  AppDispatch
};

export {
  setupStore
};
