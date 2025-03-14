import { apiSlice } from "./apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWithdrawRequests: builder.query({
      query: () => `admin/withdraw-requests`,
    }),
    deleteRequest: builder.mutation({
      query: (id) => ({
        url: `admin/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetWithdrawRequestsQuery, useDeleteRequestMutation } =
  adminApi;
