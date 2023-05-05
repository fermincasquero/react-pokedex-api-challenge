import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type HistoryState = string[];

const initialState: string[] = [];

const historySlice = createSlice({
  initialState,
  name: "history",
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
    clear: (state) => {
      state = [];
    },
  },
});

export const { add, clear } = historySlice.actions;

export default historySlice.reducer;
