// src/services/blogSlice.js
import { apiSlice } from "./apiSlice";

export const addProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "product/products",
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "product/add",
        method: "PUT",
        body: newProduct,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...updatedProduct }) => ({
        url: `product/${id}`,
        method: "PUT",
        body: updatedProduct,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `product/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = addProductApi;