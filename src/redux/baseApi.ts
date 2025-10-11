<<<<<<< HEAD
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  
 tagTypes: ["Parcel", "User"],
  endpoints: () => ({}),
=======
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  
 tagTypes: ["Parcel", "User"],
  endpoints: () => ({}),
>>>>>>> 83f810d1e4f52bcfb5248d889b25b62f8f7b5a8b
});