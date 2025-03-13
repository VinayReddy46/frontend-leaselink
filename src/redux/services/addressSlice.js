import { apiSlice } from './apiSlice';

export const addressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all addresses for a user
    getUserAddresses: builder.query({
      query: (userId) => `/address/user/${userId}`,
      transformResponse: (response) => {
        // No need to transform response data as we'll use the backend field names directly
        return response.data || [];
      },
      providesTags: ['Addresses'],
    }),
    
    // Get a single address by ID
    getAddressById: builder.query({
      query: (addressId) => `/address/${addressId}`,
      transformResponse: (response) => {
        // No need to transform response data as we'll use the backend field names directly
        return response.data || null;
      },
      providesTags: (result, error, id) => [{ type: 'Addresses', id }],
    }),
    
    // Create a new address
    createAddress: builder.mutation({
      query: (addressData) => {
        // FormData is already prepared with the correct field names in the component
        return {
          url: '/address',
          method: 'POST',
          body: addressData,
          formData: true,
        };
      },
      invalidatesTags: ['Addresses'],
    }),
    
    // Update an existing address
    updateAddress: builder.mutation({
      query: ({ addressId, data }) => {
        // FormData is already prepared with the correct field names in the component
        return {
          url: `/address/${addressId}`,
          method: 'PUT',
          body: data,
          formData: true,
        };
      },
      invalidatesTags: (result, error, { addressId }) => [
        { type: 'Addresses', id: addressId },
        'Addresses',
      ],
    }),
    
    // Delete an address
    deleteAddress: builder.mutation({
      query: (addressId) => ({
        url: `/address/${addressId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Addresses'],
    }),
  }),
});

export const {
  useGetUserAddressesQuery,
  useGetAddressByIdQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApiSlice;
