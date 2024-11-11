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
  tagTypes: ["requirements", "notes"],
  endpoints: (builder) => ({
    requirementByProjectNumber: builder.query({
      query: ({ projectNumber }) => `find-order?projectNumber=${projectNumber}`,
      transformResponse: (response) => response?.data[0],
      providesTags: ["requirements"],
    }),

    updateRequirement: builder.mutation({
      query: (requirementData) => ({
        url: "requirement/send/",
        method: "POST",
        body: requirementData,
      }),
      invalidatesTags: ["requirements"],
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

    createNote: builder.mutation({
      query: (noteData) => ({
        url: "order/create-order-note",
        method: "POST",
        body: noteData,
      }),
      invalidatesTags: ["notes"],
    }),

    updateNote: builder.mutation({
      query: ({ noteData, orderId, noteId }) => ({
        url: `order/update-order-note/${orderId}/${noteId}`,
        method: "PUT",
        body: noteData,
      }),
      invalidatesTags: ["notes"],
    }),

    deleteNoteById: builder.mutation({
      query: ({ orderId, noteId }) => ({
        url: `order/delete-order-note/${orderId}/${noteId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notes"],
    }),

    getNoteData: builder.query({
      query: ({ orderId }) => `order/find-order-note/${orderId}`,
      transformResponse: (response) => response?.data,
      providesTags: ["notes"],
    }),
  }),
});

export const {
  useRequirementByProjectNumberQuery,
  useUpdateRequirementMutation,
  useFetchActiveProjectsQuery,
  useFetchCompletedProjectsQuery,
  useUsersAllProjectsQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteByIdMutation,
  useLazyGetNoteDataQuery,
} = orderApiSlice;
