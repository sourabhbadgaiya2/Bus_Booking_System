import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const alertSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    ShowLoading: (state, action) => {
      state.loading = true;
    },
    HideLoading: (state, action) => {
      state.loading = false;
    },
  },
});

export const { ShowLoading, HideLoading } = alertSlice.actions;

export default alertSlice.reducer;
