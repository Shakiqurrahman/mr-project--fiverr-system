import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { configApi } from "../../libs/configApi";

export const uploadDesignApiSlice = createApi({
  reducerPath: "uploadDesignApi",
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
  tagTypes: [
    "Design",
    "Uploaded Design",
    "SubFolderData",
    "SubFolderDesignsData",
  ],
  endpoints: (builder) => ({
    fetchGetUpload: builder.query({
      query: () => "upload/get",
      transformResponse: (response) => response?.data,
      providesTags: ["Design", "Uploaded Design"],
    }),

    uploadADesign: builder.mutation({
      query: (data) => ({
        url: `upload/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Uploaded Design"],
    }),

    updateADesign: builder.mutation({
      query: ({ data, designId }) => ({
        url: `upload/update/${designId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Uploaded Design"],
    }),

    fetchRelatedTags: builder.query({
      query: () => "upload/get",
      transformResponse: (response) => response?.data?.map((v) => v.designId),
    }),

    fetchFolders: builder.query({
      query: () => "folder/get",
      transformResponse: (response) => {
        const folders = response?.data?.map((v) => v.folder);
        return [...new Set(folders)];
      },
    }),

    fetchSubFolders: builder.query({
      query: ({ folderName }) =>
        `folder/getSubFolders?folderName=${folderName}`,
      transformResponse: (response) => {
        const subFolders = response?.data?.map((v) => v.subFolder) || [];
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

    fetchGetAllSubFoldersByFolderSlug: builder.query({
      query: ({ slug }) => `dd/get/${slug}`,
      transformResponse: (response) => response?.data,
      providesTags: ["SubFolderData"],
    }),

    fetchGetAllDesignsByFolderSubFolder: builder.query({
      query: ({ folderName, subFolderName }) =>
        `dd/allDesginByFolderSubFolder?folderName=${folderName}&subFolderName=${subFolderName}`,
      transformResponse: (response) => response?.data,
      providesTags: ["SubFolderDesignsData"],
    }),

    UpdateAllSubFoldersByFolderSlug: builder.mutation({
      query: ({ newOrder }) => ({
        url: `dd/update`,
        method: "POST",
        body: {
          newOrder,
        },
      }),
      invalidatesTags: ["SubFolderData"],
    }),

    UpdateAllDesignsOfFolderSubFolder: builder.mutation({
      query: ({ newOrder }) => ({
        url: `dd/allDesginByFolderSubFolder`,
        method: "POST",
        body: {
          newOrder,
        },
      }),
      invalidatesTags: ["SubFolderDesignsData"],
    }),

    getDesignsBySearch: builder.query({
      query: (searchKey) => `search?searchQuery=${searchKey}`,
      transformResponse: (response) => response?.data,
    }),
  }),
});

export const {
  useFetchGetUploadQuery,
  useFetchRelatedTagsQuery,
  useFetchFoldersQuery,
  useLazyFetchSubFoldersQuery,
  useFetchIndustriesQuery,
  useFetchDesignsQuery,
  useFetchProductByIdQuery,
  useFetchAllDesignKeywordsQuery,
  useFetchAllIndustryKeywordsQuery,
  useFetchDesignByKeyQuery,
  useFetchIndustryByKeyQuery,
  useFetchDesignNdIndustryByKeyQuery,
  useDeleteDesignByIdMutation,
  useFetchGetAllFoldersQuery,
  useUploadADesignMutation,
  useUpdateADesignMutation,
  useLazyGetDesignsBySearchQuery,
  useFetchGetAllSubFoldersByFolderSlugQuery,
  useLazyFetchGetAllSubFoldersByFolderSlugQuery,
  useUpdateAllSubFoldersByFolderSlugMutation,
  useLazyFetchGetAllDesignsByFolderSubFolderQuery,
  useUpdateAllDesignsOfFolderSubFolderMutation,
} = uploadDesignApiSlice;
