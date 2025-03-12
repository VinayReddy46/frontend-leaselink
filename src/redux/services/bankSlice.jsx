import { apiSlice } from "./apiSlice";

export const banksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBanks: builder.query({
      query: (id) => `bank/bank-details/${id}`,
    }),
    getBankById: builder.query({
      query: (id) => `bank/${id}`,
    }),
    createBank: builder.mutation({
      query: (newBank) => ({
        url: "bank/add-details",
        method: "POST",
        body: newBank,
      }),
    }),
    updateBank: builder.mutation({
      query: ({ id, ...updatedBank }) => ({
        url: `bank/${id}`,
        method: "PUT",
        body: updatedBank,
      }),
    }),
    deleteBank: builder.mutation({
      query: (id) => ({
        url: `bank/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBanksQuery,
  useGetBankByIdQuery,
  useCreateBankMutation,
  useUpdateBankMutation,
  useDeleteBankMutation,
} = banksApi;