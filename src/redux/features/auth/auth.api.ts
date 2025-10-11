 
import { baseApi } from "@/redux/baseApi";
import { LoginRequest, LoginResponse, RegisterRequest,IResponse } from "@/type/auth.type";
// import { IResponse, LoginRequest, LoginResponse, RegisterRequest, ISendOtp, IVerifyOtp } from  

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Authentication
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),

    register: builder.mutation<IResponse<any>, RegisterRequest>({
      query: (userInfo) => ({
        url: "/users/register",
        method: "POST",
        data: userInfo,
      }),
    }),

    logout: builder.mutation<IResponse<any>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    // // OTP Services
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

    // Password Management
    changePassword: builder.mutation<IResponse<any>, any>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        data: data,
      }),
    }),

    // User Info
    userInfo: builder.query<IResponse<any>, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
   
  useChangePasswordMutation,
  useUserInfoQuery,
} = authApi;