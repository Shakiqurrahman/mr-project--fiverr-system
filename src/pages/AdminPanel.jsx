import React from "react";
import { FaPlus } from "react-icons/fa6";
import { useFetchAllUsersQuery } from "../Redux/api/allUserApiSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AdminPanel = () => {
  const { data: usersData, refetch, isLoading } = useFetchAllUsersQuery();
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
  return (
    <section className="max-width my-10 ">
      {isLoading ? (
        <div className=" min-h-[500px] flex justify-center items-center">
          <AiOutlineLoading3Quarters className="animate-spin text-4xl text-primary" />
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between gap-2">
            <h1 className="text-2xl font-bold text-primary">ADMIN PANEL</h1>
            <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-white">
              <FaPlus />
              Add New User
            </button>
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
                  {adminPanel?.map((user) => {
                    const letterLogo = user?.userName
                      ?.trim()
                      .charAt(0)
                      .toUpperCase();

                    const bgColor = getRoleColor(user?.role);
                    return (
                      <div
                        key={user?.id}
                        className="flex items-center border-b px-2 py-3 last:border-b-0"
                      >
                        <div className="flex w-1/3 items-center gap-3">
                          {user?.image ? (
                            <img
                              className="size-10 flex-shrink-0 rounded-full object-cover bg-[#ffefef]/80"
                              src={user?.image}
                              alt="logo"
                            />
                          ) : (
                            <div className="flex size-10 items-center justify-center rounded-full bg-[#ffefef]/80 object-cover text-2xl font-bold text-[#3b3b3b]/50">
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
                        <p className="w-1/3 text-center">Actions</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default AdminPanel;
