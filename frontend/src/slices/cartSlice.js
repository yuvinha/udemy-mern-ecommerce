import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((item) =>
          item._id === newItem._id ? newItem : item
        );
      } else {
        state.cartItems = [...state.cartItems, newItem];
      }

      updateCart(state);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
