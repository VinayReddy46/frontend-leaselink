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
  }),
});

export const {
  usePlaceOrderMutation,
} = billingApiSlice;
