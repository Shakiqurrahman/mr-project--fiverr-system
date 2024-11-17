import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dashboardProjects: [],
    searchText: "",
    searchFor: "",
  },
  reducers: {
    setDashboardProjects: (state, action) => {
      state.dashboardProjects = action.payload;
    },

    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },

    setSearchFor: (state, action) => {
      state.searchFor = action.payload;
    },
  },
});

export const { setDashboardProjects, setSearchText, setSearchFor } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
