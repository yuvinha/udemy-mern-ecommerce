import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackbar: {
    open: false,
    type: "",
    message: "",
  },
};

const componentsSlice = createSlice({
  name: "components",
  initialState,
  reducers: {
    setSnackbar: (state, action) => {
      state.snackbar = { ...action.payload };
    },
  },
});

export const { setSnackbar } = componentsSlice.actions;
export default componentsSlice.reducer;
