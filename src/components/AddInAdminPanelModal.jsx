import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoMdCheckmark } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import useOutsideClick from "../hooks/useOutsideClick";
import { useUpdateUserRolesMutation } from "../Redux/api/allUserApiSlice";

const AddInAdminPanelModal = ({ handleClose, users, roles }) => {
  const [updateUserRole, { isLoading: isUpdating }] =
    useUpdateUserRolesMutation();
  const AddPanelRef = useRef(null);
  const selectionRef = useRef();

  const [search, setSearch] = useState("");
  const [resultText, setResultText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [showSelection, setShowSelection] = useState(false);
  const [searchedUser, setSearchedUser] = useState({});

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const filteredUsers = users?.find(
      (user) =>
        user?.email?.toLowerCase().includes(search.toLowerCase()) &&
        user?.role === "USER",
    );
    const isAlreadyExists = users?.find((user) => user?.role !== "USER");

    if (search && search === filteredUsers?.email) {
      setSearchEmail(search);
    } else if (isAlreadyExists) {
      setResultText("This user is already exists in admin panel.");
    } else {
      setResultText("Sorry, we couldn't find any users.");
    }
  };

  // Handle search and fetch user suggestions
  useEffect(() => {
    if (search !== "") {
      const filteredUsers = users?.filter(
        (user) =>
          user?.email?.toLowerCase().includes(search.toLowerCase()) &&
          user?.role === "USER",
      );
      setSuggestions(filteredUsers);
    } else {
      setSuggestions([]);
    }
  }, [search, users]);

  // Fetch user details by email after user selection
  useEffect(() => {
    if (searchEmail) {
      const searchedUserData = users?.find(
        (user) => user?.email === searchEmail,
      );
      setSearchedUser(searchedUserData);
    }
  }, [searchEmail, users]);

  const handleRoleChange = (newRole) => {
    setSearchedUser((prevRoles) => ({
      ...prevRoles,
      role: newRole,
    }));
    setShowSelection(false);
  };

  const letterLogo = searchedUser?.userName?.trim().charAt(0).toUpperCase();

  const handleSave = async () => {
    if (searchedUser && searchedUser.role) {
      await updateUserRole({
        user_id: searchedUser.id,
        role: searchedUser.role,
      }).unwrap();
      toast.success("User role updated successfully");
      handleClose(false);
    } else {
      toast.error("Failed to save!");
    }
  };

  useOutsideClick(AddPanelRef, () => handleClose(false));
  useOutsideClick(selectionRef, () => setShowSelection(false));
  return (
    <div className="fixed left-0 top-0 z-[9999999] flex h-screen w-full items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div
        ref={AddPanelRef}
        className="w-full max-w-[600px] rounded-md bg-white p-6"
      >
        <h1 className="mb-10 text-center text-lg font-semibold">
          Add User In Admin Panel
        </h1>
        {searchEmail ? (
          <div className="w-full">
            <div className="flex items-center justify-between gap-2">
              <div className="flex w-2/3 items-center gap-3">
                {searchedUser?.image ? (
                  <img
                    className="size-10 flex-shrink-0 rounded-full bg-[#ffefef]/80 object-cover"
                    src={searchedUser?.image}
                    alt="logo"
                  />
                ) : (
                  <div className="flex size-10 items-center justify-center rounded-full bg-[#ffefef]/80 object-cover text-2xl font-bold text-[#3b3b3b]/50">
                    {letterLogo}
                  </div>
                )}
                <div className="flex flex-shrink-0 flex-col gap-1">
                  <p
                    title={searchedUser?.fullName}
                    className="max-w-[200px] truncate font-bold md:max-w-[400px]"
                  >
                    {searchedUser?.fullName}
                  </p>
                  <p
                    title={searchedUser?.email}
                    className="max-w-[200px] truncate md:max-w-[400px]"
                  >
                    {searchedUser?.email}
                  </p>
                </div>
              </div>
              <div className="w-1/3">
                <button
                  onClick={() => setShowSelection(true)}
                  className={`flex items-center gap-1 rounded-md px-4 py-1.5 font-semibold text-primary ${!showSelection && "hover:bg-[#e2e8f0]"}`}
                >
                  {searchedUser?.role?.replace("_", " ")}
                  <IoChevronDown className="text-[17px]" />
                </button>

                {/* Custom selection dropdown */}
                {showSelection && (
                  <ul
                    ref={selectionRef}
                    className="absolute z-10 mt-1 w-48 overflow-hidden rounded-md bg-white shadow-lg"
                  >
                    {roles?.map((role) => {
                      const isSelected = role === searchedUser?.role;
                      return (
                        <li
                          key={role}
                          onClick={() => handleRoleChange(role)}
                          className={`flex cursor-pointer justify-between gap-2 px-4 py-2 font-semibold hover:bg-gray-200 ${
                            isSelected ? "text-primary" : "text-black"
                          }`}
                        >
                          {role.replace("_", " ")}
                          {isSelected && (
                            <IoMdCheckmark className="text-[17px] text-primary" />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={
                isUpdating || (searchedUser && searchedUser.role === "USER")
              }
              className="mt-8 block w-full rounded-md bg-primary px-3 py-2 font-medium text-white outline-none disabled:bg-primary/40"
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSearch}>
            <input
              type="text"
              className={`mb-4 block w-full rounded-md border px-3 py-2 text-sm outline-none`}
              placeholder="Search by the user email"
              name="searchText"
              value={search}
              onChange={handleChange}
            />
            <div className="max-h-[150px] overflow-y-auto">
              {search !== "" &&
                suggestions.map((suggestion) => (
                  <div
                    key={suggestion?.id}
                    className="w-full border-b bg-lightskyblue last:border-b-0"
                  >
                    <p
                      className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                      onClick={() => {
                        setSearchEmail(suggestion?.email);
                        setSearch("");
                      }}
                    >
                      {suggestion?.email}
                    </p>
                  </div>
                ))}
            </div>
            <button
              type="submit"
              disabled={search === ""}
              className="mt-3 block w-full rounded-md bg-primary px-3 py-2 font-medium text-white outline-none disabled:bg-primary/40"
            >
              Search
            </button>
            {resultText && (
              <div className="mt-4 text-center text-sm text-red-500">
                {resultText}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default AddInAdminPanelModal;
