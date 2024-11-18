import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetProjectsBySearchQuery } from "../../Redux/api/dashboardApiSlice";
import {
  setDashboardProjects,
  setSearchFor,
  setSearchText,
} from "../../Redux/features/dashboardSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const { searchText } = useSelector((state) => state.dashboard);

  const [getProjectsBySearch, { data: searchingProjects, isLoading, isError }] =
    useLazyGetProjectsBySearchQuery();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText) {
      getProjectsBySearch({ searchText });
    }
    if (isError) {
      toast.error("Data Not Found!");
    }
  };

  useEffect(() => {
    if (searchingProjects && searchText) {
      dispatch(setDashboardProjects(searchingProjects));
      dispatch(setSearchFor(searchText));
    }
  }, [searchingProjects, searchText]);
  return (
    <div className="mt-6 bg-lightskyblue p-4">
      <h1 className="mb-2 text-lg font-semibold text-primary">
        Search Project
      </h1>
      <form
        onSubmit={handleSearch}
        className="relative flex items-stretch border"
      >
        <input
          className="w-full rounded-sm px-3 py-1 text-sm outline-none"
          type="text"
          name="searchText"
          value={searchText}
          onChange={(e) => dispatch(setSearchText(e.target.value))}
          placeholder="Project Number or Username"
        />
        <button className="rounded-sm bg-primary p-2" type="submit">
          <GoSearch className="text-base text-white" />
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
