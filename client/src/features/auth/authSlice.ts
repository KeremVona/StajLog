import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./authActions";
import type { AuthState } from "../../interfaces/auth/Auth";

const initialState: AuthState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // const userToken = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default authSlice.reducer;
