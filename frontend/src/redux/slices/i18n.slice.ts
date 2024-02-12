import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { i18nData, I18nDescription } from "../../data";
import { I18nLanguage } from "../../interface";

interface I18nState {
  i18n: I18nDescription;
}

const initialFunc = () => {
  const language = `${window?.localStorage?.getItem("language")}`;
  if (Object.keys(i18nData).includes(language)) {
    return i18nData[language as I18nLanguage];
  } else {
    const result = i18nData["english"];
    localStorage.setItem("language", result.name);
    return result;
  }
};

const initialState: I18nState = {
  i18n: initialFunc() as I18nDescription
};

const i18nSlice = createSlice({
  name: "i18nSlice",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<I18nLanguage>) => {
      state.i18n = i18nData[action.payload];
      localStorage.setItem("language", state.i18n.name);
    },
    toggleLanguage: (state) => {
      state.i18n = i18nData[state.i18n.name === "ukrainian" ? "english" : "ukrainian"];
      localStorage.setItem("language", state.i18n.name);
    }
  }
});

const { reducer: i18nReducer, actions: { setLanguage, toggleLanguage } } = i18nSlice;

const i18nActions = {
  setLanguage,
  toggleLanguage
};

export { i18nReducer, i18nActions };