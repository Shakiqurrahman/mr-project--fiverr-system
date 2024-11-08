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
  endpoints: (builder) => ({
    requirementByProjectNumber: builder.query({
      query: ({ projectNumber }) => `find-order/${projectNumber}`,
      transformResponse: (response) => response?.data,
    }),

    updateRequirement : builder.mutation({
      query: (requirementData) => ({
        url: "requirement/send/",
        method: "POST",
        body: requirementData,
      }),
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

    createNote : builder.mutation({
      query: (noteData) => ({
        url: "order/create-order-note",
        method: "POST",
        body: noteData,
      }),
    }),

    updateNote : builder.mutation({
      query: ({ noteData, orderId, noteId }) => ({
        url: `order/update-order-note/${orderId}/${noteId}`,
        method: "PUT",
        body: noteData,
      }),
    }),

    deleteById : builder.mutation({
      query: ({ orderId ,noteId }) => ({
        url: `delete-order-note/${orderId}/${noteId}`,
        method: "DELETE",
      }),
    }),

    getNoteData : builder.query({
      query: ({orderId}) => `order/find-order-note/${orderId}`,
      transformResponse: (response) => response?.data,
    })

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
} = orderApiSlice;
