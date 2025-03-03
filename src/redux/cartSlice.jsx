import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += existingItem.price;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }

      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
    },
    removeFromCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        item.totalPrice += item.price;
        state.totalQuantity += 1;
        state.totalPrice += item.price;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice -= item.price;
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;