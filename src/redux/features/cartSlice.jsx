import { createSlice } from "@reduxjs/toolkit";
import { cartApiSlice } from "../services/cartApiSlice";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
  loading: false,
  error: null,
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
        existingItem.totalPrice += existingItem.subTotal;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.subTotal,
        });
      }

      state.totalQuantity += 1;
      state.totalPrice += action.payload.subTotal;
    },
    removeFromCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.subTotal;
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        item.totalPrice += item.subTotal;
        state.totalQuantity += 1;
        state.totalPrice += item.subTotal;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice -= item.subTotal;
        state.totalQuantity -= 1;
        state.totalPrice -= item.subTotal;
      }
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      state.totalQuantity = action.payload.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = action.payload.reduce((total, item) => total + item.totalPrice, 0);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle loading states from cartApiSlice
    builder
      // getCartItems
      .addMatcher(
        cartApiSlice.endpoints.getCartItems.matchPending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        cartApiSlice.endpoints.getCartItems.matchFulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.cartItems = payload;
          state.totalQuantity = payload.reduce((total, item) => total + item.quantity, 0);
          state.totalPrice = payload.reduce((total, item) => total + (item.subtotal || 0), 0);
        }
      )
      .addMatcher(
        cartApiSlice.endpoints.getCartItems.matchRejected,
        (state, { payload }) => {
          state.loading = false;
          state.error = payload?.error || "Failed to fetch cart items";
        }
      )

      // addToCart
      .addMatcher(
        cartApiSlice.endpoints.addToCart.matchPending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        cartApiSlice.endpoints.addToCart.matchFulfilled,
        (state) => {
          state.loading = false;
          // We'll handle the actual cart update via getCartItems query invalidation
        }
      )
      .addMatcher(
        cartApiSlice.endpoints.addToCart.matchRejected,
        (state, { payload }) => {
          state.loading = false;
          state.error = payload?.error || "Failed to add item to cart";
        }
      );
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity,
  setCartItems,
  clearCart,
  setLoading,
  setError
} = cartSlice.actions;

export default cartSlice.reducer;