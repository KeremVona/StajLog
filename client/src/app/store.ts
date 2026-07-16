import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import internshipReducer from "../features/internship/internshipSlice";
import logReducer from "../features/log/logSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    internship: internshipReducer,
    log: logReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
