import { configureStore } from "@reduxjs/toolkit";
import { chatSliceReducer } from "../pages/Chat/store/chatSlice";

export const store = configureStore({
  reducer: {
    chat: chatSliceReducer,
  },
});
