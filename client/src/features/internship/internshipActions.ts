import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  EditInternshipThunkArgs,
  InternshipData,
  MakeInternshipBody,
} from "../../interfaces/internship/Internship";

const backendURL = "http://localhost:5000";

export const getInternships = createAsyncThunk<
  InternshipData[],
  any,
  { rejectValue: string }
>("internship/", async ({}, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(`${backendURL}/api/internship/`, config);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const getInternshipById = createAsyncThunk<
  InternshipData,
  { internshipId: number },
  { rejectValue: string }
>("internship/:id", async ({ internshipId }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(
      `${backendURL}/api/internship/${internshipId}`,
      config,
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

// response, payload, reject
export const makeInternship = createAsyncThunk<
  any,
  MakeInternshipBody,
  { rejectValue: string }
>("internship/", async (internshipData, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${backendURL}/api/internship/`,
      internshipData,
      config,
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

// response, payload, reject
export const editInternship = createAsyncThunk<
  any,
  EditInternshipThunkArgs,
  { rejectValue: string }
>("internship/:id", async ({ id, data }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.put(
      `${backendURL}/api/internship/${id}`,
      data,
      config,
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const deleteInternship = createAsyncThunk<
  any,
  { internshipId: number },
  { rejectValue: string }
>("internship/:id", async (internshipId, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.delete(
      `${backendURL}/api/internship/${internshipId}`,
      config,
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
