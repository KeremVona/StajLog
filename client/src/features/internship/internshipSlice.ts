import type { InternshipState } from "../../interfaces/internship/Internship";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteInternship,
  editInternship,
  getInternshipById,
  getInternships,
  makeInternship,
} from "./internshipActions";

const initialState: InternshipState = {
  loading: false,
  internshipInfo: [],
  error: null,
  success: false,
};

const internshipSlice = createSlice({
  name: "internship",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get internships
      .addCase(getInternships.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInternships.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.internshipInfo = action.payload;
      })
      .addCase(getInternships.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload ?? "Something went wrong";
      })

      // Get internship
      .addCase(getInternshipById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInternshipById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.internshipInfo[0] = action.payload;
      })
      .addCase(getInternshipById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // Make internship
      .addCase(makeInternship.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makeInternship.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(makeInternship.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // Edit internship
      .addCase(editInternship.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editInternship.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(editInternship.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // Delete internship
      .addCase(deleteInternship.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInternship.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteInternship.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default internshipSlice.reducer;
