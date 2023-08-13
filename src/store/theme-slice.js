import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { isDarkTheme: false },
  reducers: {
    setIsDarkTheme(state, action) {
      state.isDarkTheme = action.payload;
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice;
