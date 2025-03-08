import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { combineReducers } from "redux";
import { apiSlice } from "./services/apiSlice"; 
import authSlice from "./features/authSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authSlice,
  [apiSlice.reducerPath]: apiSlice.reducer, 
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(apiSlice.middleware), 
});

export const persistor = persistStore(store);
