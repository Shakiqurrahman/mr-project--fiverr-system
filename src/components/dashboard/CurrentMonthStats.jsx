import React from "react";

const CurrentMonthStats = () => {
  return (
    <div className="bg-lightskyblue p-4">
      <h1 className="mb-2 border-b border-primary pb-1 text-lg font-semibold text-primary">
        This Month
      </h1>
      <div className="space-y-2">
        <div className="flex justify-between gap-1 text-sm">
          <span>Completed Projects</span>
          <p className="font-semibold">90</p>
        </div>
        <div className="flex justify-between gap-1 text-sm">
          <span>Earnings</span>
          <p className="font-semibold">$1250</p>
        </div>
        <div className="flex justify-between gap-1 text-sm">
          <span>Cancelled Projects</span>
          <p className="font-semibold">1 ($35)</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentMonthStats;
