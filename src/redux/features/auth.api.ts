 
 
import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ==================== AUTH PART ====================
   logout: builder.mutation({
  query: () => ({
    url: "/auth/logout",
    method: "POST",
    
  }),
  invalidatesTags:['Auth']
}),


   login: builder.mutation({
  query: (userInfo) => ({
    url: "/auth/login",
    method: "POST",
    body: userInfo, // ✅ Correct
  }),
}),


    // sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
    //   query: (userInfo) => ({
    //     url: "/otp/send",
    //     method: "POST",
    //     data: userInfo,
    //   }),
    // }),

    // verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
    //   query: (userInfo) => ({
    //     url: "/otp/verify",
    //     method: "POST",
    //     data: userInfo,
    //   }),
    // }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    // ==================== USER PART (General & Admin) ====================
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/users/register",
        method: "POST",
        body: userInfo,
      }),
    }),

    userInfo: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateUserProfile: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),

    // Admin-specific user management
    allUsers: builder.query({
      query: () => ({
        url: "/users/allusers",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    changeUserStatus: builder.mutation({
  query: ({ userId, status }) => ({
    url: `/users/${userId}/status`,
    method: 'PATCH',
    body: { status }, // ✅ সঠিক key
  }),
  invalidatesTags: ["User"],
}),


    searchUserByEmail: builder.query({
      query: (email) => ({
        url: `/users/search?email=${email}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getUserStats: builder.query({
      query: () => ({
        url: "/users/stats",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // ==================== PARCEL PART ====================
    // General parcel creation
    parcel: builder.mutation({
      query: (parcelInfo) => ({
        url: "/parcel/parcel-create",
        method: "POST",
        body: parcelInfo,
      }),
    }),

    getSingleParcel: builder.query({
      query: (parcelId) => ({
        url: `/parcel/${parcelId}`,
        method: "GET",
      }),
      providesTags: ["Parcel"],
    }),

    getParcelStats: builder.query({
      query: () => ({
        url: "/parcel/stats",
        method: "GET",
      }),
      providesTags: ["Parcel"],
    }),

    // Admin parcel management
   allparcels: builder.query({
  query: (params) => ({
    url: "/parcel/all-parcels",
    method: "GET",
    params, // ✅ use params instead of body
  }),
  providesTags: ["Parcel"],
}),


updateParcelStatus: builder.mutation({
  query: ({ id, status }) => ({
    url: `/parcel/${id}/status`,
    method: "PATCH",
    body: JSON.stringify({ status }),
    headers: {
      "Content-Type": "application/json",
    },
  }),
  invalidatesTags: ["Parcel"],
}),


blockParcel: builder.mutation({
  query: (parcelId) => ({
    url: `/parcel/${parcelId}/block`,
    method: 'PATCH',
  }),
  invalidatesTags: ["Parcel"],
}),

unblockParcel: builder.mutation({
  query: (parcelId) => ({
    url: `/parcel/${parcelId}/unblock`,
    method: 'PATCH',
  }),
  invalidatesTags: ["Parcel"],
}),


    // Sender parcel management
    getMyParcels: builder.query({
      query: () => ({
        url: "/parcel/my-parcels",
        method: "GET",
         keepUnusedDataFor: 0,
      }),
      providesTags: ["Parcel"],
    }),

    cancelParcel: builder.mutation({
      query: (parcelId) => ({
        url: `/parcel/${parcelId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Parcel"],
    }),

    updateParcel: builder.mutation({
      query: ({ parcelId, data }) => ({
        url: `/parcel/${parcelId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Parcel"],
    }),

    deleteParcel: builder.mutation({
      query: (parcelId: string) => ({
        url: `/parcel/${parcelId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Parcel'],
    }),

    // Receiver parcel management
   getIncomingParcels: builder.query({
  query: () => ({
    url: "/parcel/incoming-parcels", // ✅ Fixed: Match backend route
    method: "GET",
  }),
  providesTags: ["Parcel"],
}),

    getDeliveredParcels: builder.query({
  query: () => ({
    url: "/parcel/delivered",
    method: "GET",
  }),
  providesTags: ["Parcel"],
}),
// endpoints: (builder) => ({
//     trackParcel: builder.query({
//       query: (trackingId: string) => `/parcel/track/${trackingId}`,
//     }),
//   }),
 trackParcel:builder.query({
  query: (trackingId: string) => ({
    url: `/parcel/track/${trackingId}`,
    method: "GET",
  }),
}),
    confirmParcel: builder.mutation({
  query: (parcelId) => ({
    url: `/parcel/${parcelId}/confirm-delivery`,
    method: "PATCH",
  }),
  invalidatesTags: ["Parcel"],
}),

  }),
});

export const {
  // Auth hooks
  useLogoutMutation,
  useLoginMutation,
   
  useChangePasswordMutation,

  // User hooks (General & Admin)
  useRegisterMutation,
  useUserInfoQuery,
  useUpdateUserProfileMutation,
  useAllUsersQuery,
  useChangeUserStatusMutation,
  useSearchUserByEmailQuery,
  useGetUserStatsQuery,

  // Parcel hooks (General, Admin, Sender, Receiver)
  useTrackParcelQuery,
  useParcelMutation,
  useGetSingleParcelQuery,
  useGetParcelStatsQuery,
  useAllparcelsQuery,
  useUpdateParcelStatusMutation,
  useBlockParcelMutation,
  useUnblockParcelMutation,
  useGetMyParcelsQuery,
  useCancelParcelMutation,
  useUpdateParcelMutation,
  useDeleteParcelMutation,
  useGetIncomingParcelsQuery,
  useGetDeliveredParcelsQuery,
  useConfirmParcelMutation,
} = authApi;
