// src/services/blogSlice.js
import { apiSlice } from './apiSlice';

export const addProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProuducts: builder.query({
      query: () => 'blogs',
    }),
    getProductById: builder.query({
      query: (id) => `blogs/${id}`,
    }),
    createBlog: builder.mutation({
      query: (newBlog) => ({
        url: 'blogs',
        method: 'POST',
        body: newBlog,
      }),
    }),
  }),
});

export const { useGetBlogsQuery, useGetBlogByIdQuery, useCreateBlogMutation } = blogApi;
