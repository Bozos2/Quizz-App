import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "questions",
  initialState: {
    items: [],
  },
  reducers: {
    addItemToArray(state, action) {
      const newQuestions = action.payload;
      state.items = newQuestions;
    },
  },
});

export const questionActions = questionSlice.actions;

export default questionSlice;
