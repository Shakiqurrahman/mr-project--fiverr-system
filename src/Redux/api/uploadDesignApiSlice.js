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
      transformResponse: (response) => response?.data,
    }),
    fetchRelatedTags: builder.query({
      query: () => "upload/get",
      transformResponse: (response) => response?.data?.map((v) => v.designId),
    }),
    fetchFolders: builder.query({
      query: () => "upload/get",
      transformResponse: (response) => {
        const folders = response?.data?.map((v) => v.folder);
        return [...new Set(folders)];
      },
    }),
    fetchSubFolders: builder.query({
      query: () => "upload/get",
      transformResponse: (response) => {
        const subFolders = response?.data?.map((v) => v.subFolder);
        return [...new Set(subFolders)];
      },
    }),
    fetchIndustries: builder.query({
      query: () => "upload/get",
      transformResponse: (response) => {
        const industries = response?.data?.map((v) => v.industrys)?.flat();
        return [...new Set(industries)];
      },
    }),
    fetchDesigns: builder.query({
      query: () => "upload/get",
      transformResponse: (response) => {
        const industries = response?.data?.map((v) => v.designs)?.flat();
        return [...new Set(industries)];
      },
    }),
    fetchProductById: builder.query({
      query: (productId) => `upload/get/${productId}`,
      transformResponse: (response) => response?.data,
    }),
  }),
});

export const {
  useFetchGetUploadQuery,
  useFetchRelatedTagsQuery,
  useFetchFoldersQuery,
  useFetchSubFoldersQuery,
  useFetchIndustriesQuery,
  useFetchDesignsQuery,
  useFetchProductByIdQuery,
} = uploadDesignApiSlice;
