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
      query: () => `affiliate/all`,
      transformResponse: (response) => response.data,
    }),

    getAUserAffiliates: builder.query({
      query: () => `affiliate/find-affiliate`,
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
  }),
});

export const {
  useGetAllAffiliatesQuery,
  useGetAUserAffiliatesQuery,
  useCreateAffiliateMutation,
  useDeleteAffiliateMutation,
} = affiliateApiSlice;
