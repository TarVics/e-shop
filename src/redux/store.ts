import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {refsReducer, i18nReducer, summaryReducer, productsReducer} from "./slices";

const rootReducer = combineReducers({
    refsReducer,
    summaryReducer,
    productsReducer,
    i18nReducer,
});

const setupStore = () => configureStore({
    reducer: rootReducer
});

type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore['dispatch']

export type {
    RootState,
    AppStore,
    AppDispatch
}

export {
    setupStore
}
