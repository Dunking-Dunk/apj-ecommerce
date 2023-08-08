import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
  name: "notification",
  initialState: {
    message: null,
    type: "success",
  },

  reducers: {
    createNotification: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearNotification: (state, action) => {
      state.message = null;
    },
  },
});

export const { createNotification, clearNotification } =
  notificationReducer.actions;

export default notificationReducer.reducer;
