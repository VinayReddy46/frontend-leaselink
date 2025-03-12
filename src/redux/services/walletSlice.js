import { apiSlice } from "./apiSlice";

export const walletsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWalletById: builder.query({
      query: (id) => `wallet/get/${id}`,
    }),
    updateWallet: builder.mutation({
      query: ({ id,...updatedWallet }) => ({
        url: `wallet/update/${id}`,
        method: "PUT",
        body: updatedWallet,
      }),
    }),
  }),
});

export const {
  
  useGetWalletByIdQuery,
  useUpdateWalletMutation,
} = walletsApi;