import React, { useState } from "react";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const filterType = [
    {
      id: 1,
      name: "Today",
    },
    {
      id: 2,
      name: "Last 7 Days",
    },
    {
      id: 3,
      name: "This Month",
    },
    {
      id: 4,
      name: "Last Month",
    },
    {
      id: 5,
      name: "Last 3 Months",
    },
    {
      id: 5,
      name: "Last 6 Months",
    },
    {
      id: 6,
      name: "This Year",
    },
    {
      id: 7,
      name: parseInt(new Date().getFullYear()) - 1,
    },
    {
      id: 8,
      name: parseInt(new Date().getFullYear()) - 2,
    },
    {
      id: 9,
      name: "All Times",
    },
  ];

  const usersType = ["Returning", "New", "Affiliate"];

  const clientData = [
    {
      id: 1,
      name: "John Doe",
      userName: "jhon123",
      usersType: "Returning",
      isAffiliate: false,
      isOnline: true,
      date: "2022-01-01",
      avatar:
        "https://i.pinimg.com/564x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg",
    },
    {
      id: 2,
      name: "John Abraham",
      userName: "abraham123",
      userType: "Returning",
      isOnline: false,
      date: "2022-01-01",
    },
    {
      id: 3,
      name: "John Sina",
      userName: "jhonsina",
      userType: "New",
      isOnline: false,
      date: "2022-01-01",
      avatar:
        "https://i.pinimg.com/564x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg",
    },
    {
      id: 4,
      name: "Shake",
      userName: "shake75",
      userType: "Returning",
      isAffiliate: true,
      isOnline: true,
      affiliateUsers: [
        {
          id: 1,
          name: "John Doe",
          userName: "jhon123",
          date: "2022-01-01",
          isOnline: true,
        },
        {
          id: 2,
          name: "Puthin",
          userName: "puthin",
          date: "2022-01-01",
          isOnline: true,
          avatar:
            "https://i.pinimg.com/564x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg",
        },
      ],
      date: "2022-01-01",
      avatar:
        "https://i.pinimg.com/564x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg",
    },
  ];

  const [selectedFilterType, setSelectedFilterType] = useState(
    filterType[0]?.name || "",
  );
  const [selectedUsersType, setSelectedUsersType] = useState(
    usersType[0] || "Returning",
  );

  const handleStatsTypeChange = (e) => {
    setSelectedFilterType(e.target.value);
  };

  const handleUsersTypeChange = (e) => {
    setSelectedUsersType(e.target.value);
  };

  const filteredUsers = clientData?.filter((client) => {
    switch (selectedUsersType) {
      case "Returning":
        return client.userType === "Returning";
      case "New":
        return client.userType === "New";
      case "Affiliate":
        return client.isAffiliate === true;
      default:
        return true;
    }
  });
  return (
    <div className="mt-6 bg-lightskyblue p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-primary pb-2">
        <h1 className="text-lg font-semibold text-primary">Users</h1>
        <select
          name="filterStatistics"
          id="filterStatistics"
          className="border p-1 px-2 text-sm font-medium outline-none"
          onChange={handleStatsTypeChange}
        >
          {filterType.map((type, idx) => (
            <option key={idx} value={type?.name}>
              {type?.name}
            </option>
          ))}
        </select>
      </div>

      {/* user type button  */}
      <div className="flex flex-wrap justify-between gap-3">
        {usersType.map((type, idx) => (
          <button
            key={idx}
            className={`rounded-[30px] border border-gray-400 px-4 py-0.5 font-medium duration-300 hover:bg-lightcream ${selectedUsersType === type && "bg-lightcream"}`}
            onClick={handleUsersTypeChange}
            value={type}
          >
            {type}
          </button>
        ))}
      </div>

      {/* all users */}
      <div className="mt-6 space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => {
            const letterLogo =
              !user.avatar && user?.userName.trim().charAt(0).toUpperCase();
            return (
              <div key={user?.id}>
                <Link
                  to={`/${user?.userName}`}
                  className="flex items-center gap-2 group"
                >
                  <div className="relative flex-shrink-0">
                    {user.avatar ? (
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="size-8 rounded-full border object-cover"
                      />
                    ) : (
                      <div className="flex size-8 items-center justify-center rounded-full border bg-gray-200 object-cover text-xl font-bold text-[#3b3b3b]/50">
                        {letterLogo}
                      </div>
                    )}
                    <span
                      className={`absolute bottom-0 right-0.5 size-2 rounded-full border border-white ${user.isOnline ? "bg-primary" : "bg-gray-400"}`}
                    ></span>
                  </div>
                  <h3 className="text-base font-semibold group-hover:underline duration-300">{user?.userName}</h3>
                </Link>

                <div className="ml-10 mt-2 space-y-2">
                  {user?.isAffiliate &&
                    user?.affiliateUsers.map((affUser) => {
                      const letterLogo =
                        !affUser.avatar &&
                        affUser?.userName.trim().charAt(0).toUpperCase();
                      return (
                        <Link
                          to={`/${affUser?.userName}`}
                          key={affUser?.id}
                          className="flex items-center gap-2 group"
                        >
                          <div className="relative flex-shrink-0">
                            {affUser.avatar ? (
                              <img
                                src={affUser?.avatar}
                                alt={affUser?.name}
                                className="size-5 rounded-full border object-cover"
                              />
                            ) : (
                              <div className="flex size-5 items-center justify-center rounded-full border bg-gray-200 object-cover text-sm font-bold text-[#3b3b3b]/50">
                                {letterLogo}
                              </div>
                            )}
                            <span
                              className={`absolute bottom-0 right-0 size-1.5 rounded-full border border-white ${affUser.isOnline ? "bg-primary" : "bg-gray-400"}`}
                            ></span>
                          </div>
                          <h3 className="text-sm font-medium group-hover:underline duration-300">
                            {affUser?.userName}
                          </h3>
                        </Link>
                      );
                    })}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center">No users found!</p>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
