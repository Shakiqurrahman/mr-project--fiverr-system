import React from "react";
import { useGetProjectsStatsQuery } from "../../Redux/api/dashboardApiSlice";

const CurrentMonthStats = () => {
  const { data: stats } = useGetProjectsStatsQuery({
    timeFilter: "This Month",
  });

  return (
    <div className="bg-lightskyblue p-4">
      <h1 className="mb-2 border-b border-primary pb-1 text-lg font-semibold text-primary">
        This Month
      </h1>
      <div className="space-y-2">
        <div className="flex justify-between gap-1 text-sm">
          <span>Completed Projects</span>
          <p className="font-semibold">{stats?.completedOrders}</p>
        </div>
        <div className="flex justify-between gap-1 text-sm">
          <span>Earnings</span>
          <p className="font-semibold">${stats?.totalEarnings}</p>
        </div>
        <div className="flex justify-between gap-1 text-sm">
          <span>Cancelled Projects</span>
          <p className="font-semibold">
            {stats?.canceledOrders} (${stats?.totalCancelledAmount})
          </p>
        </div>
        <div className="flex justify-between gap-1 text-sm">
          <span>Avg. Selling Price</span>
          <p className="font-semibold">${stats?.averageOrderValue}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentMonthStats;
