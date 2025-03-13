import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseUrl = "http://192.168.1.5:8000/api/v1";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    credentials: "include",
  }),
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7777' }),
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.29.187:7777' }),

  endpoints: () => ({}),
});

export default apiSlice;
