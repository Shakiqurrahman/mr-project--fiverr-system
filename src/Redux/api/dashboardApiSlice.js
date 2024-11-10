import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { configApi } from "../../libs/configApi";

export const dashboardApiSlice = createApi({
  reducerPath: "dashboardApi",
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
    getAllProjects: builder.query({
      query: () => "find-order",
      transformResponse: (response) => response?.data,
    }),

    getProjectsStats: builder.query({
      query: ({ timeFilter }) =>
        `find-order/order-count?timeFilter=${timeFilter}`,
      transformResponse: (response) => response?.data,
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetProjectsStatsQuery,
  useLazyGetProjectsStatsQuery,
} = dashboardApiSlice;
