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
      query: (userId) => `avaiableforchat/${userId}`,
      transformResponse: (response) => response?.data,
      // providesTags: ["availablechatusers", "getAllMessages"],
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
      invalidatesTags: ["getAllMessages", "bubble"],
    }),

    //reply message

    // Create start contact for Message
    startContactForChat: builder.mutation({
      query: (newMessage) => ({
        url: "contactForChat",
        method: "POST",
        body: newMessage,
      }),
      invalidatesTags: ["getAllMessages", "bubble"],
    }),

    // delete a message
    deleteAMessage: builder.mutation({
      query: (commonKey) => ({
        url: `message/${commonKey}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getAllMessages"],
    }),

    // update custom offer withdraw and reject button value message
    customOfferMsgUpdate: builder.mutation({
      query: (body) => ({
        url: `message/customOfferUpdate`,
        method: "PATCH",
        body: body,
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
      transformResponse: (response) => response?.data,
    }),
    updateCustomOfferImage: builder.mutation({
      query: (data) => ({
        url: "image/create",
        method: "POST",
        body: data,
      }),
    }),

    // send message from profile
    sendMessageFromProfile: builder.mutation({
      query: ({ userId }) => ({
        url: `sendMessageForChat/${userId}`,
        method: "POST",
        // body: data,
      }),
      invalidatesTags: ["getAllMessages", "availablechatusers", "bubble"],
    }),

    // send message from profile
    updateUnseenMessage: builder.mutation({
      query: ({ userId }) => ({
        url: `seen/update/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["getAllMessages", "availablechatusers", "bubble"],
    }),

    // Inbox bubble counting value
    inboxBubbleCounting: builder.query({
      query: () => "notification/inbox",
      transformResponse: (response) => response?.data?.total,
      providesTags: ["bubble"],
    }),

    // Inbox make unread message
    makeUnreadMessage: builder.mutation({
      query: ({ userId }) => ({
        url: `seen/update`,
        method: "PUT",
        body: { userId },
      }),
      invalidatesTags: ["getAllMessages", "availablechatusers", "bubble"],
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
  useSendMessageFromProfileMutation,
  useUpdateUnseenMessageMutation,
  useInboxBubbleCountingQuery,
  useCustomOfferMsgUpdateMutation,
  useMakeUnreadMessageMutation,
} = inboxApiSlice;
