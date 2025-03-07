import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { combineReducers } from "redux";
import { apiSlice } from "./services/apiSlice"; // Import your RTK Query API slice

// Combine reducers (useful if you have multiple slices)
const rootReducer = combineReducers({
  cart: cartReducer,
  [apiSlice.reducerPath]: apiSlice.reducer, // Ensure RTK Query reducer is included
});

// Configure Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // Only persist specific reducers (avoid persisting RTK Query)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer, // Pass the persisted reducer directly
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }).concat(apiSlice.middleware), // Ensure RTK Query middleware is added
});

// Create persistor to persist state
export const persistor = persistStore(store);
