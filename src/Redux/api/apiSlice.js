import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { configApi } from "../../libs/configApi";

export const apiSlice = createApi({
  reducerPath: "api",
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
  tagTypes: ["socialMedia", "user", "notification"],
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  refetchOnFocus: true,

  endpoints: (builder) => ({
    fetchUserData: builder.query({
      query: () => "get-singel-user",
      providesTags: ["user", "notification"],
    }),

    fetchSocialMedias: builder.query({
      query: () => "social-media-link",
      transformResponse: (response) => response?.data,
      providesTags: ["socialMedia"],
    }),

    updateSocialMedias: builder.mutation({
      query: (socialMediaLinks) => ({
        url: "social-media-link",
        method: "POST",
        body: socialMediaLinks,
      }),
      invalidatesTags: ["socialMedia"],
    }),

    getUsersProjectStatus: builder.query({
      query: ({ userId }) => `profile/${userId}`,
      transformResponse: (response) => response?.data,
      providesTags: ["user"],
    }),

    getNotification: builder.query({
      query: () => `notification/get`,
      transformResponse: (response) => response?.data?.filteredNotifications,
      providesTags: ["user", "notification"],
    }),

    getNotificationCount: builder.query({
      query: () => `notification/count`,
      transformResponse: (response) => response?.data,
      providesTags: ["user", "notification"],
    }),

    notificationMakeSeen: builder.mutation({
      query: () => ({
        url: "notification/update",
        method: "PUT",
      }),
      invalidatesTags: ["socialMedia", "notification"],
    }),
  }),
});

export const {
  useFetchUserDataQuery,
  useFetchSocialMediasQuery,
  useUpdateSocialMediasMutation,
  useLazyGetUsersProjectStatusQuery,
  useGetNotificationQuery,
  useGetNotificationCountQuery,
  useNotificationMakeSeenMutation,
} = apiSlice;
