import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { configApi } from "../../libs/configApi";

export const allUserApiSlice = createApi({
  reducerPath: "allUserApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${configApi.api}` }),
  endpoints: (builder) => ({
    fetchAllUsers: builder.query({
      query: () => "all-user",
      transformResponse: (response) => response?.data,
    }),
  }),
});

export const { useFetchAllUsersQuery } = allUserApiSlice;