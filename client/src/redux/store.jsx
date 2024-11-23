import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./reducers/alertSlice";
import userSlice from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    alerts: alertSlice,
  },
});
