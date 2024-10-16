import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { configApi } from "../../libs/configApi";

export const uploadDesignApiSlice = createApi({
  reducerPath: "uploadDesignApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${configApi.api}`,
  }),
  tagTypes: ["Design"],
  endpoints: (builder) => ({
    fetchGetUpload: builder.query({
      query: () => "upload/get",
      transformResponse: (response) => response?.data,
      providesTags: ["Design"],
    }),
    fetchRelatedTags: builder.query({
      query: () => "upload/get",
      transformResponse: (response) => response?.data?.map((v) => v.designId),
    }),
    fetchFolders: builder.query({
      query: () => "folder/get",
      transformResponse: (response) => {
        const folders = response?.data?.map((v) => v.name);
        return [...new Set(folders)];
      },
    }),
    fetchSubFolders: builder.query({
      query: () => "folder/get",
      transformResponse: (response, meta, arg) => {
        console.log(arg);
        const subFolders =
          response?.data?.find((v) => v.name === arg)?.subFolders || [];
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
    fetchAllDesignKeywords: builder.query({
      query: () => `designs/get`,
      transformResponse: (response) => [...new Set(response?.data)],
    }),
    fetchAllIndustryKeywords: builder.query({
      query: () => `industrys/get`,
      transformResponse: (response) => [...new Set(response?.data)],
    }),
    fetchDesignByKey: builder.query({
      query: (key) => `designs/filter/get?name=${key}`,
      transformResponse: (response) => response?.data,
    }),
    fetchIndustryByKey: builder.query({
      query: (key) => `industrys/filter/get?name=${key}`,
      transformResponse: (response) => response?.data,
    }),
    fetchDesignNdIndustryByKey: builder.query({
      query: ({ dKey, iKey }) =>
        `getTogether/get?design=${dKey}&industry=${iKey}`,
      transformResponse: (response) => response?.data,
    }),
    deleteDesignById: builder.mutation({
      query: (id) => ({
        url: `upload/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Design"],
    }),
    fetchGetAllFolders: builder.query({
      query: () => "upload/feature-folder",
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
  useFetchSortedUploadsQuery,
  useFetchProductByIdQuery,
  useFetchAllDesignKeywordsQuery,
  useFetchAllIndustryKeywordsQuery,
  useFetchDesignByKeyQuery,
  useFetchIndustryByKeyQuery,
  useFetchDesignNdIndustryByKeyQuery,
  useDeleteDesignByIdMutation,
  useFetchGetAllFoldersQuery,
} = uploadDesignApiSlice;
