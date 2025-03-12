import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.163.84:8000/api/v1",
    credentials: "include",
  }),
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7777' }),
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.29.187:7777' }),

  endpoints: () => ({}),
});

export default apiSlice;
