import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import { useSelector } from "react-redux";
import AddInAdminPanelModal from "../components/AddInAdminPanelModal";
import useOutsideClick from "../hooks/useOutsideClick";
import {
  useFetchAllUsersQuery,
  useUpdateUserRolesMutation,
} from "../Redux/api/allUserApiSlice";

const AdminPanel = () => {
  const buttonsRef = useRef([]);
  const selectionRef = useRef();
  const { user: ownData } = useSelector((state) => state.user);
  const { data: usersData, isLoading } = useFetchAllUsersQuery();
  const [updateUserRoles, { isLoading: isUpdating }] =
    useUpdateUserRolesMutation();

  const [selectedUser, setSelectedUser] = useState(null);
  const [userRoles, setUserRoles] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [dropdownX, setDropdownX] = useState(0);
  const [dropdownY, setDropdownY] = useState(0);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");

  const adminPanel = usersData?.filter((user) =>
    ["ADMIN", "SUPER_ADMIN", "SUB_ADMIN"].includes(user?.role),
  );

  const getRoleColor = (role) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "#d0fdf5";
      case "ADMIN":
        return "#ebf3ff";
      case "SUB_ADMIN":
        return "#f1f1f3";
      default:
        return "#f1f1f3";
    }
  };

  const roles = ["SUPER_ADMIN", "ADMIN", "SUB_ADMIN", "USER"];

  const handleSelectedButton = (id, role, index) => {
    const { x, y } = buttonsRef.current[index].getBoundingClientRect();
    setDropdownX(x);
    setDropdownY(y);
    setUserRole(role);
    setUserId(id);
    setSelectedUser(selectedUser === id ? null : id);
  };

  const handleRoleChange = (userId, newRole) => {
    setUserRoles((prevRoles) => ({
      ...prevRoles,
      [userId]: newRole,
    }));
    setSelectedUser(null);
  };

  const getDisplayRole = (user) => {
    return userRoles[user?.id] || user?.role;
  };

  const handleSaveChanges = async () => {
    const usersToUpdate = Object.keys(userRoles).map((userId) => ({
      user_id: userId,
      role: userRoles[userId],
    }));
    console.log("Users updated successfully:", usersToUpdate);
    if (usersToUpdate.length > 0) {
      try {
        await updateUserRoles({ users: usersToUpdate });
        toast.success("Users updated successfully!");
        setUserRoles({});
      } catch (err) {
        console.error("Error updating users:", err);
        toast.error("Failed to update!");
      }
    }
  };

  useOutsideClick(selectionRef, () => setSelectedUser(null));
  return (
    <section className="max-width my-10">
      {isLoading ? (
        <div className="flex min-h-[500px] items-center justify-center">
          <AiOutlineLoading3Quarters className="animate-spin text-4xl text-primary" />
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:flex-nowrap">
            <h1 className="text-2xl font-bold text-primary">ADMIN PANEL</h1>
            <div className="flex gap-2">
              <button
                onClick={handleSaveChanges}
                disabled={isUpdating || Object.keys(userRoles).length === 0}
                className="shadow-btn-shado bg-whit flex h-10 w-36 items-center justify-center gap-2 rounded-md border bg-primary px-4 py-2 text-sm text-white duration-300 disabled:bg-primary/40"
              >
                {isUpdating ? (
                  <AiOutlineLoading3Quarters className="animate-spin text-white" />
                ) : (
                  "Save Changes"
                )}
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-white"
              >
                <FaPlus />
                Add New User
              </button>
            </div>
          </div>
          <div className="dashboard-overflow-x rounded-md shadow-lg">
            <div className="min-w-[700px] bg-[#f9faff]">
              <div className="w-full">
                <div className="flex rounded-md bg-lightcream px-5 py-3 text-sm">
                  <p className="w-1/3 font-semibold">Name</p>
                  <p className="w-1/3 text-center font-semibold">Role</p>
                  <p className="w-1/3 text-center font-semibold">Actions</p>
                </div>
                <div className="rounded-md bg-white px-3 text-sm">
                  {adminPanel?.map((user, index) => {
                    const letterLogo = user?.userName
                      ?.trim()
                      .charAt(0)
                      .toUpperCase();

                    const bgColor = getRoleColor(user?.role);

                    const currentRole = getDisplayRole(user);

                    const owned = user?.id === ownData.id;
                    return (
                      <div
                        key={user?.id}
                        className="flex items-center border-b px-2 py-3 last:border-b-0"
                      >
                        <div className="flex w-1/3 items-center gap-3">
                          {user?.image ? (
                            <img
                              className="size-10 flex-shrink-0 rounded-full bg-[#ffefef]/80 object-cover"
                              src={user?.image}
                              alt="logo"
                            />
                          ) : (
                            <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-[#ffefef]/80 object-cover text-2xl font-bold text-[#3b3b3b]/50">
                              {letterLogo}
                            </div>
                          )}
                          <div className="flex flex-shrink-0 flex-col gap-1">
                            <p
                              title={user?.fullName}
                              className="max-w-[200px] truncate font-bold md:max-w-[400px]"
                            >
                              {user?.fullName}
                            </p>
                            <p
                              title={user?.email}
                              className="max-w-[200px] truncate md:max-w-[400px]"
                            >
                              {user?.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex w-1/3 justify-center">
                          <p
                            className="inline rounded-full px-4 py-1.5 text-center font-semibold"
                            style={{ backgroundColor: bgColor }}
                          >
                            {user?.role.replace("_", " ")}
                          </p>
                        </div>
                        {owned ? (
                          <div className="relative flex w-1/3 justify-center">
                            <p className="font-semibold text-black/50">OWNED</p>
                          </div>
                        ) : (
                          <div className="relative flex w-1/3 justify-center">
                            <button
                              ref={(el) => (buttonsRef.current[index] = el)}
                              onClick={() =>
                                handleSelectedButton(
                                  user?.id,
                                  user?.role,
                                  index,
                                )
                              }
                              className={`flex items-center gap-1 rounded-md px-4 py-1.5 font-semibold text-primary ${!selectedUser && "hover:bg-[#e2e8f0]"}`}
                            >
                              {currentRole.replace("_", " ")}
                              <IoChevronDown className="text-[17px]" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {showAddModal && (
        <AddInAdminPanelModal
          handleClose={() => setShowAddModal(false)}
          users={usersData}
          roles={roles}
        />
      )}
      {/* Custom selection dropdown */}
      {selectedUser === userId && (
        <ul
          ref={selectionRef}
          className="absolute z-10 mt-1 w-48 overflow-hidden rounded-md bg-white shadow-lg"
          style={{ top: `${dropdownY}px`, left: `${dropdownX - 50}px` }}
        >
          {roles.map((role) => {
            const isSelected = userRoles[userId]
              ? role === userRoles[userId]
              : role === userRole;

            return (
              <li
                key={role}
                onClick={() => handleRoleChange(userId, role)}
                className={`flex cursor-pointer justify-between gap-2 px-4 py-2 text-sm font-semibold hover:bg-gray-200 ${
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
    </section>
  );
};

export default AdminPanel;
