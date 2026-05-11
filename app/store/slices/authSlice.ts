import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchLogout,
  fetchRefreshToken,
  fetchUserInfo,
} from "../Thunks/authThuk";

type AuthState = {
  id: string;
  email: string;
  role: "pending" | "admin" | "employer" | "candidate";
  status: "off" | "login" | "valid" | "refresh";
};

const initialState: AuthState = {
  id: "",
  email: "",
  role: "pending",
  status: "off",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: string; email: string }>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.status = "valid";
    },
    setRole: (state, action: PayloadAction<"pending" | "admin" | "employer" | "candidate">) => {
      state.role = action.payload;
    },
    setStatus: (state, action: PayloadAction<AuthState["status"]>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<AuthState>) => {
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.status = "valid";
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.status = "login";
      })
      .addCase(fetchRefreshToken.fulfilled, (state) => {
        state.status = "valid";
      })
      .addCase(fetchRefreshToken.rejected, (state) => {
        state.status = "login";
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.id = "";
        state.email = "";
        state.role = "pending";
        state.status = "login";
      })
      .addCase(fetchLogout.rejected, (state) => {
        state.status = state.status;
      });
  },
});

export const { setUser, setRole, setStatus } = authSlice.actions;
export default authSlice.reducer;
