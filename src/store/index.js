import { configureStore } from "@reduxjs/toolkit";

import questionSlice from "./question-data";
import uiSlice from "./ui-slice";
import authSlice from "./auth";
import themeSlice from "./theme-slice";

const store = configureStore({
  reducer: {
    questions: questionSlice.reducer,
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    theme: themeSlice.reducer,
  },
});
console.log(store.getState());
export default store;
