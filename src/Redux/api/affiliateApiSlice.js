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
  endpoints: (builder) => ({
    getAllAffiliates: builder.query({
      query: () => `affiliate/all`,
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetAllAffiliatesQuery } = affiliateApiSlice;
