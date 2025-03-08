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
      query: (newCategory) => ({
        url: "faqs",
        method: "POST",
        body: newCategory,
      }),
    }),
    updateFaq: builder.mutation({
      query: ({ id, updatedCategory }) => ({
        url: `faqs/${id}`,
        method: "PUT",
        body: updatedCategory,
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
