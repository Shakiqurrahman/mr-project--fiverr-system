import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { configApi } from "../../libs/configApi";

export const apiSlice = createApi({
  reducerPath: "api",
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
  tagTypes: ["socialMedia", "user"],
  endpoints: (builder) => ({
    fetchUserData: builder.query({
      query: () => "get-singel-user",
      providesTags: ["user"],
    }),
    fetchSocialMedias: builder.query({
      query: () => "social-media-link",
      transformResponse: (response) => response?.data,
      providesTags: ["socialMedia"],
    }),
    updateSocialMedias: builder.mutation({
      query: (socialMediaLinks) => ({
        url: "social-media-link",
        method: "POST",
        body: socialMediaLinks,
      }),
      invalidatesTags: ["socialMedia"],
    }),
  }),
});

export const {
  useFetchUserDataQuery,
  useFetchSocialMediasQuery,
  useUpdateSocialMediasMutation,
} = apiSlice;
