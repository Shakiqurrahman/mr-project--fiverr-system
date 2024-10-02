import { useState } from "react";
import HorizontalBarChart from "./Chart/HorizontalBarChart";
import ProjectLineChart from "./Chart/ProjectLineChart";

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

const ProjectDetailsData = () => {
  // Line Chart stats
  const [keywordFilterOptions, setKeywordFilterOptions] = useState([]);
  const [selectedFilterOption, setSelectedFilterOption] = useState("All");
  const [filterTimes, setFilterTimes] = useState(getFilterTimes());
  const [selectedTimeOption, setSelectedTimeOption] = useState(
    getFilterTimes()[1],
  );

  // Progress bar Stats
  const activeProjectsData = {
    revision: 2300,
    ongoing: 2150,
    waiting: 1200,
    delivered: 3000,
  };
  const finishedProjectData = {
    completed: 2100,
    cancelled: 250,
  };
  const ProjectOptionsData = {
    custom: 250,
    direct: 100,
    offer: 100,
    "M-D Project": 80,
  };
  const ProjectBuyersData = {
    "New Buyers": 39,
    "Repeat Buyers": 34,
  };
  const avgSellingData = {
    custom: 250,
    direct: 100,
  };

  return (
    <>
      {/* LineChart Component */}
      <div className="bg-lightcream p-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="w-full shrink-0 text-lg font-semibold text-primary xl:w-auto">
            Project Details
          </h1>
          <div className="flex w-full shrink-0 items-center gap-3 md:w-auto">
            <div className="h-[10px] w-[10px] shrink-0 rounded-full bg-ongoing"></div>
            <span className="text-sm font-medium">New Projects 16 ($470)</span>
          </div>
          <div className="flex w-full shrink-0 items-center gap-3 md:w-auto">
            <div className="h-[10px] w-[10px] shrink-0 rounded-full bg-primary"></div>
            <span className="text-sm font-medium">
              Completed Projects 14 ($430)
            </span>
          </div>
          <div className="flex w-full shrink-0 items-center gap-3 md:w-auto">
            <div className="h-[10px] w-[10px] shrink-0 rounded-full bg-revision"></div>
            <span className="text-sm font-medium">
              Cancelled Projects 1 ($25)
            </span>
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
          <ProjectLineChart
            selectedTimeOption={selectedTimeOption}
            selectedLegend={selectedFilterOption}
            setDatasetLabels={setKeywordFilterOptions}
          />
        </div>
      </div>
      {/* Progress Bar Component */}
      <div className="mt-10">
        {/* Active Projects Bar chart  */}
        <HorizontalBarChart
          data={activeProjectsData}
          title={"Active Projects"}
        />
        <HorizontalBarChart
          data={finishedProjectData}
          title={"Finished Projects"}
          filter={true}
        />
        <HorizontalBarChart
          data={ProjectOptionsData}
          title={"Project Options"}
          filter={true}
        />
        <HorizontalBarChart
          data={ProjectBuyersData}
          title={"Project Buyers"}
          filter={true}
        />
        <HorizontalBarChart
          data={avgSellingData}
          title={"Avg Selling Price"}
          color={{ custom: "#7ba7c2", direct: "#9258c8" }}
          filter={true}
        />
      </div>
    </>
  );
};

export default ProjectDetailsData;
