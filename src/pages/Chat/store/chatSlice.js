import { createSlice } from "@reduxjs/toolkit";
import { GetRooms } from "./thunk";

const chatSlice = createSlice({
  initialState: {
    user: {},
    rooms: [],
    roomName: "",
    messages: [],
  },
  name: "chat",
  reducers: {
    getRooms: (state, action) => {
      state.rooms = action.payload;
    },

    messanger: (state, action) => {
      state.messages = action.payload;
    },
  },
  extraReducers: (bulider) => {
    bulider.addCase(GetRooms.fulfilled, (state, action) => {
      state.rooms = action.payload;
    });
  },
});
export const { getRooms, messanger } = chatSlice.actions;
export const chatSliceReducer = chatSlice.reducer;
