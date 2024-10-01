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
      providesTags: ["getAllMessages"],
    }),

    // Get All Conversational Messages for admin
    getAllMessages: builder.query({
      query: ({ receiverId }) => `message/${receiverId}`,
      transformResponse: (response) => response?.data,
      providesTags: ["getAllMessages"],
      pollingInterval: 1000,
    }),

    // Create start contact for Message
    startContactForChat: builder.mutation({
      query: (newMessage) => ({
        url: "contactForChat",
        method: "POST",
        body: newMessage,
      }),
      invalidatesTags: ["getAllMessages"],
    }),
  }),
});

export const {
  useFetchQuickResMsgQuery,
  useCreateQuickResMsgMutation,
  useUpdateQuickResMsgMutation,
  useDeleteQuickResMsgMutation,
  useGetAvailableChatUsersQuery,
  useLazyGetAllMessagesQuery,
  useStartContactForChatMutation,
} = inboxApiSlice;
