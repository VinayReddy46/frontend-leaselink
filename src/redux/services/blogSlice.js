import { apiSlice } from "./apiSlice";

export const blogsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "blogs",
    }),
    getBlogById: builder.query({
      query: (id) => `blogs/${id}`,
    }),
    createBlog: builder.mutation({
      query: (newBlog) => ({
        url: "blogs",
        method: "POST",
        body: newBlog,
      }),
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...updatedBlog }) => ({
        url: `blogs/${id}`,
        method: "PUT",
        body: updatedBlog,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `blogs/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogsApi;