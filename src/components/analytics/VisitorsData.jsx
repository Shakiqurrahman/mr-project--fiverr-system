import { useState } from "react";
import { TiArrowDownThick, TiArrowUpThick } from "react-icons/ti";
import LineChart from "./Chart/LineChart";

const getFilterTimes = () => {
  const currentYear = new Date().getFullYear();
  return [
    "Last 7 Days",
    "Last 30 Days",
    "Last Month",
    "Last 3 Months",
    "Last 6 Months",
    "This Year",
    `${currentYear - 1}`, // Last Year
    `${currentYear - 2}`, // 2 Years Ago
    "All Times",
  ];
};

const VisitorsData = () => {
  const [keywordFilterOptions, setKeywordFilterOptions] = useState([]);
  const [selectedFilterOption, setSelectedFilterOption] = useState("All");
  const [filterTimes, setFilterTimes] = useState(getFilterTimes());
  const [selectedTimeOption, setSelectedTimeOption] = useState(
    getFilterTimes()[1],
  );

  return (
    <div className="bg-lightskyblue p-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="w-full text-lg font-semibold xl:w-auto">
          Visitors Overview
        </h1>
        <div className="flex w-full shrink-0 items-center gap-3 md:w-auto">
          <div className="h-[10px] w-[10px] shrink-0 rounded-full bg-primary"></div>
          <span className="font-medium">Total Visitors 180</span>
          <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-white">
            <TiArrowUpThick className="text-black/50" />
          </div>
        </div>
        <div className="flex w-full shrink-0 items-center gap-3 md:w-auto">
          <div className="h-[10px] w-[10px] shrink-0 rounded-full bg-ongoing"></div>
          <span className="font-medium">New Visitors 125</span>
          <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-white">
            <TiArrowUpThick className="text-black/50" />
          </div>
        </div>
        <div className="flex w-full shrink-0 items-center gap-3 md:w-auto">
          <div className="h-[10px] w-[10px] shrink-0 rounded-full bg-waiting"></div>
          <span className="font-medium">Returning Visitors 115</span>
          <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-white">
            <TiArrowDownThick className="text-revision" />
          </div>
        </div>
        <select
          value={selectedFilterOption}
          onChange={(e) => setSelectedFilterOption(e.target.value)}
          className="shrink-0 border px-2 py-1 text-sm outline-none sm:text-base"
        >
          {keywordFilterOptions.map((key, i) => (
            <option value={key} key={i}>
              {key}
            </option>
          ))}
        </select>
        <select
          value={selectedTimeOption}
          onChange={(e) => setSelectedTimeOption(e.target.value)}
          className="shrink-0 border px-2 py-1 text-sm outline-none sm:text-base"
        >
          {filterTimes.map((key, i) => (
            <option value={key} key={i}>
              {key}
            </option>
          ))}
        </select>
      </div>
      {/* Chart Start From Here */}
      <div className="mt-5 p-3">
        <LineChart
          selectedTimeOption={selectedTimeOption}
          selectedLegend={selectedFilterOption}
          setDatasetLabels={setKeywordFilterOptions}
        />
      </div>
    </div>
  );
};

export default VisitorsData;
