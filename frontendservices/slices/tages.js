// frontendservices/slices/questionsSlice.js

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  questions: [],
  loading: false,
  error: null,
}

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload
      state.error = null
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { setQuestions, setLoading, setError } = questionsSlice.actions

export default questionsSlice.reducer
