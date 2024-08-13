"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import studentSlice from "./student/studentSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    student:studentSlice
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});


