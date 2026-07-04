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
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}auth/logout/`,
        { withCredentials: true },
      );
      if (response.data.status === "success") return "logout";
    } catch (error: any) {
      return rejectWithValue(error.response.data.status);
    }
  },
);

type UserInfo = {
  id: string;
  email: string;
  phone_number: string;
  role: "admin" | "employer" | "candidate" | "pending";
  status: "active" | "ban" | "pending" | "delete";
  date_created: Date | string | "";
};

export const getOrRefresh = createAsyncThunk(
  "auth/getOrRefresh",
  async (_, { rejectWithValue }) => {
    try {
      const getUser = async (): Promise<UserInfo> => {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}account/info/`,
          { withCredentials: true },
        );
        if (response.data.status === "Success") {
          return response.data.user;
        }
        throw new Error("User not found");
      };
      try {
        return await getUser();
      } catch (error: any) {
        if (error.response?.status === 401) {
          const refreshResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}auth/refresh_token/`,
            { withCredentials: true },
          );
          if (refreshResponse.data.status === "Success") {
            return await getUser();
          }
        }
        return rejectWithValue(error.response?.data?.status || error.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.status || error.message);
    }
  },
);
