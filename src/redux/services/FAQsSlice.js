import { apiSlice } from "./apiSlice";

export const faqsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query({
      query: () => "faqs",
    }),
    getFaqById: builder.query({
      query: (id) => `faqs/${id}`,
    }),
    createFaq: builder.mutation({
      query: (newData) => ({
        url: "faqs",
        method: "POST",
        body: newData,
      }),
    }),
    updateFaq: builder.mutation({
      query: ({ id, updatedData}) => ({
        url: `faqs/${id}`,
        method: "PUT",
        body: updatedData,
      }),
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `faqs/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFaqsQuery,
  useGetFaqByIdQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqsApi;