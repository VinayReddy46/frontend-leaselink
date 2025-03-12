import { apiSlice } from "./apiSlice";

export const manageUsersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "user/users",
    }),
    updateUser: builder.mutation({
      query: ({ id, token, ...updatedUserDetails }) => ({
        url: `user/${id}`,
        method: "PUT",
        headers: {
          accessToken: token,
        },
        body: updatedUserDetails,
      }),
    }),
  }),
});
export const { useGetUsersQuery, useUpdateUserMutation } = manageUsersApi;
