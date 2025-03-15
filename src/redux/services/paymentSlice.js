import { apiSlice } from "./apiSlice";

export const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPaymentSession: builder.mutation({
            query: ({ cartId }) => ({
                url: `/payment/create`,
                method: "POST",
                body: { cartId },
            }),
        }),

        handlePaymentSuccess: builder.mutation({
            query: ({ cartId, sessionId, userId }) => ({
                url: `/payment/payment-success`,
                method: "POST",
                body: { cartId, sessionId, userId },
            }),
        }),

        processPayout: builder.mutation({
            query: ({ cartId }) => ({
                url: `/payment/process-payout`,
                method: "POST",
                body: { cartId },
            }),
        }),

        getStripeAccountDetails: builder.query({
            query: (userId) => `/payment/stripe-account/${userId}`,
        }),
    }),
});

export const {
    useCreatePaymentSessionMutation,
    useHandlePaymentSuccessMutation,
    useProcessPayoutMutation,
    useGetStripeAccountDetailsQuery,
} = paymentApiSlice;
