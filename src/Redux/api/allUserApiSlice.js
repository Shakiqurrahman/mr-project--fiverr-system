import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { configApi } from "../../libs/configApi";

export const allUserApiSlice = createApi({
  reducerPath: "allUserApi",
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
  refetchOnMountOrArgChange: true,
  tagTypes: ["usersRole"],
  endpoints: (builder) => ({
    fetchAllUsers: builder.query({
      query: () => "all-user",
      transformResponse: (response) => response?.data,
      providesTags: ["usersRole"],
    }),

    fetchSingleUserById: builder.query({
      query: ({ userId }) => `getUserById/${userId}`,
      transformResponse: (response) => response?.data,
      providesTags: ["usersRole"],
    }),

    //update users role
    updateUserRoles: builder.mutation({
      query: (data) => ({
        url: "role/manage-role",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["usersRole"],
    }),
  }),
});

export const {
  useFetchAllUsersQuery,
  useUpdateUserRolesMutation,
  useFetchSingleUserByIdQuery,
} = allUserApiSlice;
