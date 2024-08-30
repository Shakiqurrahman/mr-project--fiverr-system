import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { configApi } from "../../libs/configApi";

export const offerProjectApiSlice = createApi({
  reducerPath: "offerProjectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${configApi.api}`,
  }),
  endpoints: (builder) => ({
    fetchOfferProject: builder.query({
      query: () => "create-project/get",
      transformResponse: (response) => response?.data[0],
    }),
  }),
});

export const { useFetchOfferProjectQuery } = offerProjectApiSlice;
