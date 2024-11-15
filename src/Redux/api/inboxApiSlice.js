import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { configApi } from "../../libs/configApi";

export const inboxApiSlice = createApi({
  reducerPath: "inboxApi",
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
  tagTypes: ["quickResponse, getAllMessages"],
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    // Get Quick Response Messages
    fetchQuickResMsg: builder.query({
      query: () => "quickResponse/quickres",
      transformResponse: (response) => response?.data,
      providesTags: ["quickResponse"],
    }),

    // Create Quick Response Message
    createQuickResMsg: builder.mutation({
      query: (newMessage) => ({
        url: "quickResponse/quickres",
        method: "POST",
        body: newMessage,
      }),
      invalidatesTags: ["quickResponse"],
    }),

    // Update Quick Response Message
    updateQuickResMsg: builder.mutation({
      query: ({ id, updatedMessage }) => ({
        url: `quickResponse/quickres/${id}`,
        method: "PUT",
        body: updatedMessage,
      }),
      invalidatesTags: ["quickResponse"],
    }),

    // Delete Quick Response Message
    deleteQuickResMsg: builder.mutation({
      query: (id) => ({
        url: `quickResponse/quickres/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["quickResponse"],
    }),

    // Get available chat users for admin
    getAvailableChatUsers: builder.query({
      query: () => "avaiableforchat",
      transformResponse: (response) => response?.data,
      providesTags: ["availablechatusers"],
    }),

    // Get All Conversational Messages for admin
    getAllMessages: builder.query({
      query: ({ receiverId = null }) => {
        return receiverId ? `message/get?userId=${receiverId}` : "message/get";
      },
      transformResponse: (response) => response?.data,
      providesTags: ["getAllMessages"],
    }),

    // Get All Conversational Messages for user
    getAdminAllMessages: builder.query({
      query: () => `message/get`,
      transformResponse: (response) => response?.data,
      providesTags: ["getAllMessages"],
    }),

    // Get All Conversational Messages for admin
    sendAMessage: builder.mutation({
      query: (newMessage) => ({
        url: "message/send",
        method: "POST",
        body: newMessage,
      }),
      invalidatesTags: ["getAllMessages"],
    }),

    //reply message

    // Create start contact for Message
    startContactForChat: builder.mutation({
      query: (newMessage) => ({
        url: "contactForChat",
        method: "POST",
        body: newMessage,
      }),
      invalidatesTags: ["getAllMessages"],
    }),

    // delete a message
    deleteAMessage: builder.mutation({
      query: (messageId) => ({
        url: `message/${messageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getAllMessages"],
    }),

    // delete a conversation
    deleteAConversation: builder.mutation({
      query: (userId) => ({
        url: `message/delete-conversation/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getAllMessages"],
    }),

    // block a user conversation
    blockAUserConversation: builder.mutation({
      query: (userId) => ({
        url: `block-chat/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["getAllMessages", "availablechatusers"],
    }),

    // block a user conversation
    archiveAUserConversation: builder.mutation({
      query: (userId) => ({
        url: `archive/archive-user/${userId}`,
        method: "POST",
      }),
      invalidatesTags: ["getAllMessages", "availablechatusers"],
    }),

    // bookmark a user conversation
    bookmarkAUserConversation: builder.mutation({
      query: (userId) => ({
        url: `bookMark/update/${userId}`,
        method: "POST",
      }),
      invalidatesTags: ["availablechatusers"],
    }),

    // custom offer image api slice
    fetchCustomOfferImage: builder.query({
      query: () => "image/get",
      transformResponse: (response) => response?.data?.image,
    }),
    updateCustomOfferImage: builder.mutation({
      query: (data) => ({
        url: "image/create",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useFetchQuickResMsgQuery,
  useCreateQuickResMsgMutation,
  useUpdateQuickResMsgMutation,
  useDeleteQuickResMsgMutation,
  useGetAvailableChatUsersQuery,
  useGetAdminAllMessagesQuery,
  useGetAllMessagesQuery,
  useLazyGetAllMessagesQuery,
  useStartContactForChatMutation,
  useSendAMessageMutation,
  useDeleteAMessageMutation,
  useDeleteAConversationMutation,
  useBlockAUserConversationMutation,
  useArchiveAUserConversationMutation,
  useBookmarkAUserConversationMutation,
  useFetchCustomOfferImageQuery,
  useUpdateCustomOfferImageMutation,
} = inboxApiSlice;
