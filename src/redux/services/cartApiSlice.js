import { apiSlice } from "./apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get cart items
    getCartItems: builder.query({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    getCartItemsByUserId: builder.query({
      query: (userId) => ({
        url: `/cart/${userId}`,
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    // Add item to cart
    addToCart: builder.mutation({
      query: (cartItem) => ({
        url: "/cart",
        method: "POST",
        body: cartItem,
      }),
      invalidatesTags: ["Cart"],
    }),

    // Remove item from cart
    removeFromCart: builder.mutation({
      query: (itemId) => ({
        url: `/cart/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    // Update cart item quantity
    updateCartItemQuantity: builder.mutation({
      query: ({ itemId, quantity }) => ({
        url: `/cart/${itemId}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    // Clear cart
    clearCart: builder.mutation({
      query: () => ({
        url: "/cart/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    // Count cart items
    countCartItems: builder.query({
      query: (userId) => ({
        url: `/cart/count/${userId}`,
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartItemsQuery,
  useGetCartItemsByUserIdQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartItemQuantityMutation,
  useClearCartMutation,
  useCountCartItemsQuery,
} = cartApiSlice;
