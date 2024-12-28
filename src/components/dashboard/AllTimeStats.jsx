import React, { useEffect, useState } from "react";
import { useLazyGetProjectsStatsQuery } from "../../Redux/api/dashboardApiSlice";

const AllTimeStats = () => {
  const statsType = [
    {
      id: 1,
      name: "All Times",
    },
    {
      id: 2,
      name: "Last Month",
    },
    {
      id: 3,
      name: "Last 3 Months",
    },
    {
      id: 4,
      name: "Last 6 Months",
    },
    {
      id: 5,
      name: "This Year",
    },
    {
      id: 6,
      name: parseInt(new Date().getFullYear()) - 1,
    },
    {
      id: 7,
      name: parseInt(new Date().getFullYear()) - 2,
    },
  ];
  const [selectedStatsType, setSelectedStatsType] = useState(
    statsType[0]?.name || 0,
  );

  const [getStatus, { data: stats }] = useLazyGetProjectsStatsQuery();

  const handleStatsTypeChange = (e) => {
    setSelectedStatsType(e.target.value);
  };

  useEffect(() => {
    if (selectedStatsType) {
      getStatus({
        timeFilter: selectedStatsType,
      });
    }
  }, [selectedStatsType, getStatus]);

  return (
    <>
      <div className="mt-6 bg-lightcream p-4">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 border-b border-primary pb-2">
          <h1 className="text-lg font-semibold text-primary">
            {selectedStatsType}
          </h1>
          <select
            name="filterStatistics"
            id="filterStatistics"
            className="border bg-white p-1 px-2 text-sm font-medium outline-none"
            onChange={handleStatsTypeChange}
          >
            {statsType.map((type, idx) => (
              <option key={idx} value={type?.name}>
                {type?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap justify-between gap-1 text-sm">
            <span>Completed Projects</span>
            <p className="font-semibold">{stats?.completedOrders}</p>
          </div>
          <div className="flex flex-wrap justify-between gap-1 text-sm">
            <span>Earnings</span>
            <p className="font-semibold">${stats?.totalEarnings}</p>
          </div>
          <div className="flex flex-wrap justify-between gap-1 text-sm">
            <span>Cancelled Projects</span>
            <p className="font-semibold">
              {stats?.canceledOrders} (${stats?.totalCancelledAmount})
            </p>
          </div>
          <div className="flex flex-wrap justify-between gap-1 text-sm">
            <span>Avg. Selling Price</span>
            <p className="font-semibold">
              $
              {stats?.averageOrderValue
                ? Math.round(stats?.averageOrderValue)
                : 0}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllTimeStats;
