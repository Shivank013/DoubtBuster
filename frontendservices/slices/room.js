import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  roomid: null,
  loading: false,
}

const room = createSlice({
    name: 'room',
    initialState: initialState,
    reducers: {
      setRoom(state, value) {
        state.roomid = value.payload
      },
      setLoading(state, value) {
        state.loading = value.payload
      },
    },
  })
  
  export const { setRoom, setLoading } = room.actions
  
  export default room.reducer