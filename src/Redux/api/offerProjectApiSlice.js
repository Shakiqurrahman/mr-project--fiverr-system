import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { configApi } from "../../libs/configApi";

export const offerProjectApiSlice = createApi({
  reducerPath: "offerProjectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${configApi.api}`,
  }),
  endpoints: (builder) => ({
    fetchOfferProject: builder.query({
      query: () => "create-project/get",
    }),
  }),
});

export const { useFetchOfferProjectQuery } = offerProjectApiSlice;