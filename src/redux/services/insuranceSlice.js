import { apiSlice } from "./apiSlice";

export const insuranceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInsurances: builder.query({
      query: () => "insurance",
    }),
    getInsuranceById: builder.query({
      query: (id) => `insurances/${id}`,
    }),
    createInsurance: builder.mutation({
      query: (newInsurance) => ({
        url: "insurances",
        method: "POST",
        body: newInsurance,
      }),
    }),
    updateInsurance: builder.mutation({
      query: ({ id, ...updatedInsurance }) => ({
        url: `insurances/${id}`,
        method: "PUT",
        body: updatedInsurance,
      }),
    }),
    deleteInsurance: builder.mutation({
      query: (id) => ({
        url: `insurances/${id}`,
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
