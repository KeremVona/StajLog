import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import internshipReducer from "../features/internship/internshipSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    internship: internshipReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
