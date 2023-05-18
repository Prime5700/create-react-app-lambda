import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addAll: (state, action) => {
      state.cart = action.payload;
    },

    add: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload.id && item.size === action.payload.size);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1, size: action.payload.size });
      }
    },
    incQty: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id && item.size === action.payload.size);
      item.quantity++;
    },
    decQty: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id && item.size === action.payload.size);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    remove: (state, action) => {
      const removeItem = state.cart.filter((item) => item.id !== action.payload.id || item.size !== action.payload.size);
      state.cart = removeItem;
    },
    removeAll: (state, action) => {
      state.cart = [];
    },
  },
});
export default cartSlice.reducer;
export const {addAll, add, incQty, decQty, remove, removeAll } = cartSlice.actions;
