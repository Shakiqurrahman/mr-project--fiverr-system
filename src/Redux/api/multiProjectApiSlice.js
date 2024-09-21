import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { configApi } from "../../libs/configApi";

export const multiProjectApiSlice = createApi({
  reducerPath: "multiProjectApi",
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
    fetchMultiProject: builder.query({
      query: () => "multi-project/get",
      transformResponse: (response) => response?.data,
    }),
  }),
});

export const { useFetchMultiProjectQuery } = multiProjectApiSlice;
