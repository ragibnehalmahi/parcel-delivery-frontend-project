 
import { baseApi } from "@/redux/baseApi";
import { CreateParcelDTO,Parcel ,} from "@/type/parcel.types";
// import { IResponse, Parcel, CreateParcelDTO  } from "@/types";
import { IResponse } from "@/type/auth.type";
export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Parcel CRUD Operations
    parcel: builder.mutation<IResponse<Parcel>, CreateParcelDTO>({
      query: (parcelInfo) => ({
        url: "/parcels",
        method: "POST",
        data: parcelInfo,
      }),
    }),

    allparcels: builder.query<IResponse<Parcel[]>, void>({
      query: () => ({
        url: "/parcels/allparcels",
        method: "GET",
      }),
      providesTags: ["Parcel"],
    }),

    getSingleParcel: builder.query<IResponse<Parcel>, string>({
      query: (parcelId) => ({
        url: `/parcels/${parcelId}`,
        method: "GET",
      }),
      providesTags: ["Parcel"],
    }),

    updateParcel: builder.mutation<IResponse<Parcel>, { parcelId: string; data: any }>({
      query: ({ parcelId, data }) => ({
        url: `/parcels/${parcelId}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["Parcel"],
    }),

    deleteParcel: builder.mutation<IResponse<any>, string>({
      query: (parcelId) => ({
        url: `/parcels/${parcelId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Parcel'],
    }),

    // Parcel Status Management
    updateParcelStatus: builder.mutation<IResponse<Parcel>, { 
      parcelId: string; 
      status: string; 
      location?: string; 
      note?: string 
    }>({
      query: ({ parcelId, status, location, note }) => ({
        url: `/parcels/${parcelId}/status`,
        method: 'PATCH',
        data: { status, location, note },
      }),
      invalidatesTags: ["Parcel"]
    }),

    blockParcel: builder.mutation<IResponse<Parcel>, string>({
      query: (parcelId) => ({
        url: `/parcels/${parcelId}/block`,
        method: 'PATCH',
      }),
      invalidatesTags: ["Parcel"]
    }),

    unblockParcel: builder.mutation<IResponse<Parcel>, string>({
      query: (parcelId) => ({
        url: `/parcels/${parcelId}/unblock`,
        method: 'PATCH',
      }),
      invalidatesTags: ["Parcel"]
    }),

    cancelParcel: builder.mutation<IResponse<Parcel>, string>({
      query: (parcelId) => ({
        url: `/parcels/${parcelId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Parcel"],
    }),

    confirmParcel: builder.mutation<IResponse<Parcel>, string>({
      query: (parcelId) => ({
        url: `/parcels/${parcelId}/confirm-delivery`,
        method: "PATCH",
      }),
      invalidatesTags: ["Parcel"],
    }),

    // Parcel Queries by Role
    getMyParcels: builder.query<IResponse<Parcel[]>, void>({
      query: () => ({
        url: "/parcels/my",
        method: "GET",
      }),
      providesTags: ["Parcel"],
    }),

    getIncomingParcels: builder.query<IResponse<Parcel[]>, void>({
      query: () => ({
        url: "/parcels/incoming",
        method: "GET",
      }),
      providesTags: ["Parcel"],
    }),

    getDeliveredParcels: builder.query<IResponse<Parcel[]>, void>({
      query: () => ({
        url: "/parcels/delivered",
        method: "GET",
      }),
      providesTags: ["Parcel"],
    }),

    // Parcel Statistics
    getParcelStats: builder.query<IResponse<any>, void>({
      query: () => ({
        url: "/parcels/stats",
        method: "GET",
      }),
      providesTags: ["Parcel"],
    }),
  }),
});

export const {
  useParcelMutation,
  useAllparcelsQuery,
  useGetSingleParcelQuery,
  useUpdateParcelMutation,
  useDeleteParcelMutation,
  useUpdateParcelStatusMutation,
  useBlockParcelMutation,
  useUnblockParcelMutation,
  useCancelParcelMutation,
  useConfirmParcelMutation,
  useGetMyParcelsQuery,
  useGetIncomingParcelsQuery,
  useGetDeliveredParcelsQuery,
  useGetParcelStatsQuery,
} = parcelApi;