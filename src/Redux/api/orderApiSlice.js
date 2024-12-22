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
  tagTypes: ["requirements", "notes", "messages", "cancel"],
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
      providesTags: ["notes", "cancel"],
    }),

    // order review api's
    getAllAdminReviews: builder.query({
      query: () => "review/get-all-owner-reviews",
      transformResponse: (response) => response?.data,
    }),
    getAUserReviews: builder.query({
      query: ({ userName }) => `review/${userName}`,
      transformResponse: (response) => response?.data,
    }),
    createAReview: builder.mutation({
      query: (reviewData) => ({
        url: "review/create",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["requirements"],
    }),

    // Order Message api's
    sendAOrderMessage: builder.mutation({
      query: (newMessage) => ({
        url: "order-message/send",
        method: "POST",
        body: newMessage,
      }),
      invalidatesTags: ["messages"],
    }),

    getOrderUserMessages: builder.query({
      query: ({ userId, projectNumber }) =>
        `order-message/get?userId=${userId}&projectNumber=${projectNumber}`,
      transformResponse: (response) => response?.data,
      providesTags: ["messages", "cancel"],
    }),

    sendAOrderMessageReply: builder.mutation({
      query: (newMessage) => ({
        url: "order-message/reply",
        method: "POST",
        body: newMessage,
      }),
      invalidatesTags: ["messages"],
    }),

    deleteAOrderMessage: builder.mutation({
      query: ({ commonKey, projectNumber }) => ({
        url: `order-message/${commonKey}/${projectNumber}`,
        method: "DELETE",
      }),
      invalidatesTags: ["messages"],
    }),

    updateAOrderMessage: builder.mutation({
      query: (updatedBody) => ({
        url: `order-message/update`,
        method: "PUT",
        body: updatedBody,
      }),
      invalidatesTags: ["messages"],
    }),

    cancelOrderProject: builder.mutation({
      query: ({ orderId, orderMessageId, piId }) => ({
        url: `cancel-order`,
        method: "POST",
        body: { orderId, orderMessageId, piId },
      }),
      invalidatesTags: ["messages", "cancel"],
    }),

    acceptExtendDelivery: builder.mutation({
      query: ({ orderMessageId, approvedByAdmin, orderId }) => ({
        url: `order/approve-extension`,
        method: "POST",
        body: { orderMessageId, approvedByAdmin, orderId },
      }),
      invalidatesTags: ["messages"],
    }),

    submitDelivery: builder.mutation({
      query: ({ projectNumber }) => ({
        url: `delivery/deliverd`,
        method: "POST",
        body: { projectNumber },
      }),
      invalidatesTags: ["messages"],
    }),

    acceptRevision: builder.mutation({
      query: ({ projectNumber, uniqueId, updatedMessage }) => ({
        url: `delivery/revision`,
        method: "POST",
        body: { projectNumber, uniqueId, updatedMessage },
      }),
      invalidatesTags: ["messages"],
    }),

    acceptDelivery: builder.mutation({
      query: ({ projectNumber, uniqueId, updatedMessage, userId }) => ({
        url: `delivery/accept`,
        method: "POST",
        body: { projectNumber, uniqueId, updatedMessage, userId },
      }),
      invalidatesTags: ["messages"],
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
  useGetAllAdminReviewsQuery,
  useCreateAReviewMutation,
  useSendAOrderMessageMutation,
  useSendAOrderMessageReplyMutation,
  useDeleteAOrderMessageMutation,
  useUpdateAOrderMessageMutation,
  useGetOrderUserMessagesQuery,
  useLazyGetOrderUserMessagesQuery,
  useCancelOrderProjectMutation,
  useGetAUserReviewsQuery,
  useSubmitDeliveryMutation,
  useAcceptRevisionMutation,
  useAcceptDeliveryMutation,
  useAcceptExtendDeliveryMutation,
} = orderApiSlice;
