import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { configApi } from "../../libs/configApi";
import Cookies from "js-cookie";

export const reviewApiSlice = createApi({
  reducerPath: "reviewApi",
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
  tagTypes: ["review"],
  endpoints: (builder) => ({
    getAllAdminReviews: builder.query({
      query: () => "review/get-all-admin-reviews",
      transformResponse: (response) => response?.data,
      providesTags: ["review"],
    }),
    createAReview: builder.mutation({
      query: (reviewData) => ({
        url: "review/create",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const { useGetAllAdminReviewsQuery, useCreateAReviewMutation } =
  reviewApiSlice;
