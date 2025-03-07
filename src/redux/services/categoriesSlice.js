import { apiSlice } from "./apiSlice";

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "api/v1/categories",
    }),
    getCategoryById: builder.query({
      query: (id) => `api/v1/categories/${id}`,
    }),
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "api/v1/categories",
        method: "POST",
        body: newCategory,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, updatedCategory }) => ({
        url: `api/v1/categories/${id}`,
        method: "PUT",
        body: updatedCategory,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `api/v1/categories/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
