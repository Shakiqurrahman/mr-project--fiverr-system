import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useLazyGetVisitorsByFilterQuery } from "../../Redux/api/analyticsApiSlice";

const TotalVisitors = () => {
  const currentYear = new Date().getFullYear();

  const filterType = [
    { id: 1, name: "Today" },
    { id: 2, name: "Last 7 Days" },
    { id: 3, name: "This Month" },
    { id: 4, name: "Last Month" },
    { id: 5, name: "Last 3 Months" },
    { id: 6, name: "Last 6 Months" },
    { id: 7, name: "This Year" },
    currentYear === 2025 ? null : { id: 8, name: currentYear - 1 }, // Last Year
    currentYear === 2025 || currentYear === 2026
      ? null
      : { id: 9, name: currentYear - 2 }, // 2 Years Ago
    { id: 10, name: "All Times" },
  ].filter(Boolean);

  const [getVisitorsByFilter, { data: VisitorsData }] =
    useLazyGetVisitorsByFilterQuery();

  const [selectedFilterType, setSelectedFilterType] = useState(
    filterType[0]?.name || "",
  );

  const handleStatsTypeChange = (e) => {
    setSelectedFilterType(e.target.value);
  };

  useEffect(() => {
    if (selectedFilterType) {
      getVisitorsByFilter({ date: selectedFilterType });
    }
  }, [selectedFilterType, getVisitorsByFilter]);

  // const totalVisitors = "200263435";
  const totalVisitorsArray = VisitorsData?.reduce(
    (prev, curr) => prev + parseInt(curr.totalVisitors),
    0,
  )
    ?.toString()
    ?.split("")
    ?.map(Number);

  return (
    <div className="mt-6 bg-lightcream p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-primary pb-2">
        <h1 className="text-lg font-semibold text-primary">Total Visitors</h1>
        <select
          name="filterStatistics"
          id="filterStatistics"
          className="border bg-white p-1 px-2 text-sm font-medium outline-none"
          onChange={handleStatsTypeChange}
        >
          {filterType.map((type, idx) => (
            <option key={idx} value={type?.name}>
              {type?.name}
            </option>
          ))}
        </select>
      </div>

      <div
        className="flex flex-wrap justify-center gap-2"
        title={VisitorsData?.reduce(
          (prev, curr) => prev + parseInt(curr.totalVisitors),
          0,
        )}
      >
        {totalVisitorsArray?.slice(0, 5).map((totalVistor, idx) => (
          <div
            key={idx}
            className="flex size-9 items-center justify-center rounded-md border border-primary bg-white text-lg font-bold text-primary"
          >
            {totalVistor}
          </div>
        ))}
        {totalVisitorsArray?.length > 5 && (
          <div className="flex size-9 items-center justify-center rounded-md border border-primary bg-white p-1 text-lg font-bold text-primary">
            <FaPlus />
          </div>
        )}
      </div>
    </div>
  );
};

export default TotalVisitors;
