import { apiSlice } from './apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (credentials) => ({
        url: `user/update-profile`,
        method: "PUT",
        body: credentials,
      }),
    }),

    updatePassord: builder.mutation({
      query: (credentials) => ({
        url: `user/update-password`,
        method: "PUT",
        body: credentials,
      }),
    }),
  }),
});

export const {useUpdateProfileMutation,useUpdatePassordMutation, } = userApi;