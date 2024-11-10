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
    allProjectStatus: builder.query({
      query: () => "find-order/project-status",
      transformResponse: (response) => response?.data,
    }),
    getAllProjects: builder.query({
      query: ({status}) => `find-order?projectStatus=${status}`,
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
  useAllProjectStatusQuery,
  useLazyGetAllProjectsQuery,
  useGetProjectsStatsQuery,
  useLazyGetProjectsStatsQuery,
} = dashboardApiSlice;
