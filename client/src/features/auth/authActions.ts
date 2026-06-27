import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  RegisterResponse,
  RegisterPayload,
} from "../../interfaces/auth/Auth";

const backendURL = "http://localhost:5000";

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async ({ email, password }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${backendURL}/api/auth/register`,
      { email, password },
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
