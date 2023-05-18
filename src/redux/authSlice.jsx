import { createSlice } from "@reduxjs/toolkit";
import { signin } from "../api/apis";

// Step 1: Define the auth state
const initialState = {
  isAuthenticated: false,
  accessToken: null,
  email:null,
  error: null,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.email=action.payload.email;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.email=null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.email=null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export default authSlice.reducer;
export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
