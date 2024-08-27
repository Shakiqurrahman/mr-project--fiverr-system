import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { configApi } from "../../libs/configApi";

export const uploadDesignApiSlice = createApi({
  reducerPath: "uploadDesignApi",  
  baseQuery: fetchBaseQuery({
    baseUrl: `${configApi.api}`,  
  }),
  endpoints: (builder) => ({
    fetchGetUpload: builder.query({
      query: () => "upload/get",  
      transformResponse: (response) => response.data,  
    }),
  }),
});

export const { useFetchGetUploadQuery, useAddUploadDesignMutation } = uploadDesignApiSlice;
