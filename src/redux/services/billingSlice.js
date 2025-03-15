import { apiSlice } from './apiSlice';

export const billingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Place order endpoint
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: "/billingroute",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders", "Addresses", "Cart", "Count"],
    }),
    getOrders: builder.query({
      query: (id) => `billingroute/${id}`,
    }),
    getMyRentedProducts: builder.query({
      query: (id) => `billingroute/myrented/${id}`,
    }),
    getMyOrderedProducts: builder.query({
      query: (id) => `billingroute/${id}`,
    }),
    updateStatus: builder.mutation({
      query: (id) => `billingroute/${id}`,
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetOrdersQuery,
  useGetMyRentedProductsQuery,
  useGetMyOrderedProductsQuery,
  useUpdateStatusMutation,
} = billingApiSlice;
