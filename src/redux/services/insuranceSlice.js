import { apiSlice } from "./apiSlice";

export const insuranceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInsurances: builder.query({
      query: (userId) => `insurance/${userId}`,
    }),
    getInsuranceById: builder.query({
      query: (id) => `insurance/${id}`,
    }),
    createInsurance: builder.mutation({
      query: (newInsurance) => ({
        url: "insurance",
        method: "POST",
        body: newInsurance,
      }),
    }),
    updateInsurance: builder.mutation({
      query: ({ id, ...updatedInsurance }) => ({
        url: `insurance/${id}`,
        method: "PUT",
        body: updatedInsurance,
      }),
    }),
    deleteInsurance: builder.mutation({
      query: (id) => ({
        url: `insurance/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetInsurancesQuery,
  useGetInsuranceByIdQuery,
  useCreateInsuranceMutation,
  useUpdateInsuranceMutation,
  useDeleteInsuranceMutation,
} = insuranceApi;