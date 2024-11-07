import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { configApi } from "../../libs/configApi";

export const orderApiSlice = createApi({
  reducerPath: "orderApi",
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
    requirementByProjectNumber: builder.query({
      query: ({ projectNumber }) => `find-order/${projectNumber}`,
      transformResponse: (response) => response?.data,
    }),

    fetchActiveProjects: builder.query({
      query: () => "order-status",
      transformResponse: (response) => response?.data,
    }),

    fetchCompletedProjects: builder.query({
      query: ({ status }) => `order-status?status=${status}`,
      transformResponse: (response) => response?.data,
    }),

    usersAllProjects: builder.query({
      query: ({ userId }) => `order-status?user_id=${userId}`,
      transformResponse: (response) => response?.data,
    }),
  }),
});

export const {
  useFetchActiveProjectsQuery,
  useFetchCompletedProjectsQuery,
  useUsersAllProjectsQuery,
  useRequirementByProjectNumberQuery,
} = orderApiSlice;
