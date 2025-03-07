import { apiSlice } from './apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: 'api/v1/auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    otpVerify: builder.mutation({
      query: (userData) => ({
        url: 'api/v1/auth/otp-verification',
        method: 'POST',
        body: userData,
      }),
    }),
    reSendOtp: builder.mutation({
      query: (userData) => ({
        url: 'api/v1/auth/resend-otp',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'api/v1/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: 'api/v1/auth/forgot-password',
        method: 'POST',
        body: credentials,
      }),
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: 'api/v1/auth/reset-password',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUserProfile: builder.query({
      query: () => 'api/v1/auth/profile',
    }),
  }),
});

export const {  useRegisterMutation,useOtpVerifyMutation, useReSendOtpMutation,useLoginMutation,useForgotPasswordMutation,useResetPasswordMutation, useGetUserProfileQuery, } = authApi;
