import { configureStore } from "@reduxjs/toolkit";

import questionSlice from "./question-data";
import uiSlice from "./ui-slice";
import authSlice from "./auth";

const store = configureStore({
  reducer: {
    questions: questionSlice.reducer,
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
  },
});
console.log(store.getState());
export default store;
