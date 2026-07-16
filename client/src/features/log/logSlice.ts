import { createSlice } from "@reduxjs/toolkit";
import type { LogState } from "../../interfaces/log/Log";
import { editLog, getLogById, getLogs, makeLog } from "./logActions";

const initialState: LogState = {
  loading: false,
  logInfo: [],
  error: null,
  success: false,
};

const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get logs
      .addCase(getLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.logInfo = action.payload;
      })
      .addCase(getLogs.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload ?? "Something went wrong";
      })

      // Get log
      .addCase(getLogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLogById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.logInfo[0] = action.payload;
      })
      .addCase(getLogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // Make log
      .addCase(makeLog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makeLog.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(makeLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // Edit log
      .addCase(editLog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editLog.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(editLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // Delete log
      .addCase(editLog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editLog.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(editLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default logSlice.reducer;
