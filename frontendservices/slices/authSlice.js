"use client"
import { createSlice } from "@reduxjs/toolkit";

// We initialize the token to null
let initialToken = null;

// We check if the window object is defined
if (typeof window !== 'undefined') {
  // If it is, we can use localStorage
  initialToken = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
}

const initialState = {
  signupData: null,
  loading: false,
  token: initialToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,

  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
      if (typeof window !== 'undefined') {
        // If window is defined, we can use localStorage
        localStorage.setItem("token", JSON.stringify(value.payload));
      }
    },
  },
});
export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;