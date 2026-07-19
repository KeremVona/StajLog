import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  EditLogThunkArgs,
  LogData,
  MakeLogBody,
} from "../../interfaces/log/Log";

const backendURL = "http://localhost:5000";

export const getLogs = createAsyncThunk<
  LogData[],
  void,
  { rejectValue: string }
>("log/get", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    let parsedToken;
    if (token) parsedToken = JSON.parse(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parsedToken.jwtToken}`,
      },
    };
    const response = await axios.get(`${backendURL}/api/log/`, config);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const getLogById = createAsyncThunk<
  LogData,
  { logId: number },
  { rejectValue: string }
>("log/get/:id", async ({ logId }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    let parsedToken;
    if (token) parsedToken = JSON.parse(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parsedToken.jwtToken}`,
      },
    };
    const response = await axios.get(`${backendURL}/api/log/${logId}`, config);
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
export const makeLog = createAsyncThunk<
  any,
  MakeLogBody,
  { rejectValue: string }
>("log/make", async (logData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    let parsedToken;
    if (token) parsedToken = JSON.parse(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parsedToken.jwtToken}`,
      },
    };
    const response = await axios.post(
      `${backendURL}/api/log/`,
      logData,
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
export const editLog = createAsyncThunk<
  any,
  EditLogThunkArgs,
  { rejectValue: string }
>("log/edit/:id", async ({ id, data }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    let parsedToken;
    if (token) parsedToken = JSON.parse(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parsedToken.jwtToken}`,
      },
    };
    const response = await axios.put(
      `${backendURL}/api/log/${id}`,
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

export const deleteLog = createAsyncThunk<
  any,
  { logId: number },
  { rejectValue: string }
>("log/delete/:id", async (logId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    let parsedToken;
    if (token) parsedToken = JSON.parse(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parsedToken.jwtToken}`,
      },
    };
    const response = await axios.delete(
      `${backendURL}/api/log/${logId.logId}`,
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
