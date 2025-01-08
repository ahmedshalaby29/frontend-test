import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

// Configure the Redux store with the userReducer
const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

// Define RootState and AppDispatch types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
