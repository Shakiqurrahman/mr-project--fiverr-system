import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { configApi } from "../../libs/configApi";

export const analyticsApiSlice = createApi({
  reducerPath: "analyticsApi",
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
    getReturnBuyers: builder.query({
      query: ({ date }) => `analytics/return-buyes?timeFilter=${date}`,
      transformResponse: (response) => response.data,
    }),

    getWordlDominationData: builder.query({
      query: () => `analytics/world-domination`,
      transformResponse: (response) => response.data,
    }),

    getAllVisitors: builder.query({
      query: () => `analytics/visitors`,
      transformResponse: (response) => response.data,
    }),

    getVisitorsByFilter: builder.query({
      query: ({ date }) => `analytics/visitors/total?timeFilter=${date}`,
      transformResponse: (response) => response.data,
    }),

    getTopKeywordsByFilter: builder.query({
      query: ({ date }) => `analytics/top-keywords?timeFilter=${date}`,
      transformResponse: (response) => response.data,
    }),

    topKeywordsImpression: builder.query({
      query: ({ keywords }) => `analytics/top-keyword?keywords=${keywords}`,
      transformResponse: (response) => response.data,
    }),

    topKeywordsClick: builder.query({
      query: ({ keyword }) => `analytics/top-keyword/${keyword}`,
      transformResponse: (response) => response.data,
    }),

    getProjectsDetailsByFilter: builder.query({
      query: ({ date }) =>
        `analytics/project-details/getProjectAnalytics?timeFilter=${date}`,
      transformResponse: (response) => response.data,
    }),

    getActiveProjectsAnalytics: builder.query({
      query: () => `analytics/project-details/active-project`,
      transformResponse: (response) => response.data,
    }),

    getFinishProjectsAnalytics: builder.query({
      query: ({ timeFilter }) =>
        `analytics/project-details/finished-projects?timeFilter=${timeFilter}`,
      transformResponse: (response) => response.data,
    }),

    getProjectOptionsAnalytics: builder.query({
      query: ({ timeFilter }) =>
        `analytics/project-details/project-options?timeFilter=${timeFilter}`,
      transformResponse: (response) => response.data,
    }),

    getProjectBuyersAnalytics: builder.query({
      query: ({ timeFilter }) =>
        `analytics/project-details/project-buyers?timeFilter=${timeFilter}`,
      transformResponse: (response) => response.data,
    }),

    getAvarageSellingAnalytics: builder.query({
      query: ({ timeFilter }) =>
        `analytics/project-details/avg-selling?timeFilter=${timeFilter}`,
      transformResponse: (response) => response.data,
    }),

    getCategoriesDataAnalytics: builder.query({
      query: ({ timeFilter }) => `analytics/cetegorys?timeFilter=${timeFilter}`,
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useLazyGetReturnBuyersQuery,
  useGetWordlDominationDataQuery,
  useGetAllVisitorsQuery,
  useLazyGetVisitorsByFilterQuery,
  useGetActiveProjectsAnalyticsQuery,
  useLazyGetFinishProjectsAnalyticsQuery,
  useLazyGetProjectBuyersAnalyticsQuery,
  useLazyGetCategoriesDataAnalyticsQuery,
  useLazyGetProjectOptionsAnalyticsQuery,
  useLazyGetAvarageSellingAnalyticsQuery,
  useLazyGetProjectsDetailsByFilterQuery,
  useLazyTopKeywordsClickQuery,
  useLazyTopKeywordsImpressionQuery,
  useLazyGetTopKeywordsByFilterQuery,
} = analyticsApiSlice;
