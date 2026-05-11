import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserInfo = createAsyncThunk(
  "auth/fetchUserinfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}account/info/`,
        { withCredentials: true },
      );
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response.data.status);
    }
  },
);

export const fetchRefreshToken = createAsyncThunk(
  "auth/fetchRefreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}auth/refresh_token/`,
        { withCredentials: true },
      );
      if (response.data.status === "Success") return "Success";
    } catch (error: any) {
      return rejectWithValue(error.response.data.status);
    }
  },
);

export const fetchLogout = createAsyncThunk(
  "auth/fetchLogout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}auth/logout/`,
        { withCredentials: true },)
      if (response.data.status === "success") return "logout"
    } catch (error: any) {
      return rejectWithValue(error.response.data.status)
    }
  }
)
