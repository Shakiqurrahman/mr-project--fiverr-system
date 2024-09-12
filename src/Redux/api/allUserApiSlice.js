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
  endpoints: (builder) => ({
    fetchAllUsers: builder.query({
      query: () => "all-user",
      transformResponse: (response) => response?.data,
    }),
  }),
});

export const { useFetchAllUsersQuery } = allUserApiSlice;