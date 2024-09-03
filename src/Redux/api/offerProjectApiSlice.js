import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { configApi } from "../../libs/configApi";

export const offerProjectApiSlice = createApi({
  reducerPath: "offerProjectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${configApi.api}`,
  }),
  endpoints: (builder) => ({
    fetchOfferProject: builder.query({
      query: () => "create-offer-project/get",
      transformResponse: (response) => response?.data[0],
    }),
    updateOfferProject: builder.mutation({
      query: (projectData) => ({
        url: "create-offer-project/create",
        method: "POST",
        body: projectData,
      }),
    }),
  }),
});

export const { useFetchOfferProjectQuery, useUpdateOfferProjectMutation } = offerProjectApiSlice;