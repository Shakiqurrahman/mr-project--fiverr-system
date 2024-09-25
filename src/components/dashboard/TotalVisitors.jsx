import React, { useState } from "react";

const TotalVisitors = () => {
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

  const [selectedFilterType, setSelectedFilterType] = useState(
    filterType[0]?.name || "",
  );

  const handleStatsTypeChange = (e) => {
    setSelectedFilterType(e.target.value);
  };

  const totalVistors = "200263";
  const totalVisitorsArray = totalVistors?.toString().split("").map(Number);

  return (
    <div className="mt-6 bg-lightcream p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-primary pb-2">
        <h1 className="text-lg font-semibold text-primary">
          Total Visitors
        </h1>
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

      <div className="flex flex-wrap gap-3 justify-center">
        {totalVisitorsArray?.map((totalVistor, idx) => (
          <div key={idx} className="px-4 py-2 text-2xl font-bold border border-primary bg-white text-primary rounded-md">
            {totalVistor}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalVisitors;
