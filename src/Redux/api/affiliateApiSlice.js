import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { configApi } from "../../libs/configApi";

export const affiliateApiSlice = createApi({
  reducerPath: "affiliateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${configApi.api}`,
    prepareHeaders: (headers) => {
      const token = Cookies.get("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["affiliate"],
  endpoints: (builder) => ({
    getAllAffiliates: builder.query({
      query: ({ keywordFilter, timeFilter }) =>
        `affiliate/all?keywordFilter=${keywordFilter}&timeFilter=${timeFilter}`,
      transformResponse: (response) => response.data,
    }),

    getAUserAffiliates: builder.query({
      query: () => `affiliate/find-affiliate`,
      transformResponse: (response) => response.data,
      providesTags: ["affiliate"],
    }),

    getAllWithdrawRequests: builder.query({
      query: () => `affiliate/withdrawRequests`,
      transformResponse: (response) => response.data,
      providesTags: ["affiliate"],
    }),

    createAffiliate: builder.mutation({
      query: ({ link }) => ({
        url: `affiliate/create`,
        method: "POST",
        body: { link },
      }),
      invalidatesTags: ["affiliate"],
    }),

    deleteAffiliate: builder.mutation({
      query: ({ affLink, userId }) => ({
        url: `affiliate/delete?affiliate_link=${affLink}&user_id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["affiliate"],
    }),

    withdrawRequest: builder.mutation({
      query: (data) => ({
        url: `affiliate/withdrawRequest`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["affiliate"],
    }),

    saveWithdrawInfo: builder.mutation({
      query: (data) => ({
        url: `affiliate/paymentMethod-setUp`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["affiliate"],
    }),

    getWithdrawInfo: builder.query({
      query: () => `affiliate/paymentMethod-profile`,
      transformResponse: (response) => response.data,
      providesTags: ["affiliate"],
    }),
  }),
});

export const {
  useLazyGetAllAffiliatesQuery,
  useGetAUserAffiliatesQuery,
  useCreateAffiliateMutation,
  useDeleteAffiliateMutation,
  useWithdrawRequestMutation,
  useSaveWithdrawInfoMutation,
  useGetAllWithdrawRequestsQuery,
  useGetWithdrawInfoQuery,
} = affiliateApiSlice;
