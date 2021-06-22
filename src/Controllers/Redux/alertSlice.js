import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "alert",
  initialState: {
    show: false,
    type: null,
    msg: null,
  },
  reducers: {
    clearAlert: (state) => {
      state.show = false;
      state.type = null;
      state.msg = null;
    },
    generateAlert: (state, action) => {
      state.show = true;
      state.type = action.payload.type;
      state.msg = action.payload.msg;
    },
  },
});

export default slice.reducer;

export const { generateAlert, clearAlert } = slice.actions;
