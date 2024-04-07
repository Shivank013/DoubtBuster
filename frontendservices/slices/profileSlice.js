"use client"
import { createSlice } from '@reduxjs/toolkit'

let initialuser = null;

if (typeof window !== 'undefined') {

  initialuser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  
}
const initialState = {
  user: initialuser,
  loading: false,
}
const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState ,
  reducers: {
    setUser(state, value) {
      state.user = value.payload
      if (typeof window !== 'undefined') {
        // If window is defined, we can use localStorage
        localStorage.setItem("user", JSON.stringify(value.payload));
      }
      
    },
    setLoading(state, value) {
      state.loading = value.payload
    },
  },
})

export const { setUser, setLoading } = profileSlice.actions

export default profileSlice.reducer
