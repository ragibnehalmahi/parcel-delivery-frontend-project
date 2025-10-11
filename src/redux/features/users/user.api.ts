 
import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/type/auth.type";
import { IUser } from "@/type/user.types";
 

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // User Management
    allUsers: builder.query<IResponse<IUser[]>, void>({
      query: () => ({
        url: "/users/allusers",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    changeUserStatus: builder.mutation<IResponse<any>, { userId: string; status: string }>({
      query: ({ userId, status }) => ({
        url: `/users/${userId}/status`,
        method: 'PATCH',
        data: { status },
      }),
      invalidatesTags: ["User"]
    }),

    searchUserByEmail: builder.query<IResponse<IUser>, string>({
      query: (email) => ({
        url: `/users/search?email=${email}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateUserProfile: builder.mutation<IResponse<IUser>, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["User"],
    }),

    // User Statistics
    getUserStats: builder.query<IResponse<any>, void>({
      query: () => ({
        url: "/users/stats",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useAllUsersQuery,
  useChangeUserStatusMutation,
  useSearchUserByEmailQuery,
  useUpdateUserProfileMutation,
  useGetUserStatsQuery,
} = userApi;