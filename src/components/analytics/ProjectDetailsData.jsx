import { useEffect, useState } from "react";
import {
  useGetActiveProjectsAnalyticsQuery,
  useLazyGetAvarageSellingAnalyticsQuery,
  useLazyGetFinishProjectsAnalyticsQuery,
  useLazyGetProjectBuyersAnalyticsQuery,
  useLazyGetProjectOptionsAnalyticsQuery,
  useLazyGetProjectsDetailsByFilterQuery,
} from "../../Redux/api/analyticsApiSlice";
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
  ];
};

const ProjectDetailsData = () => {
  const [getProjectDetails, { data: projectDetailsData }] =
    useLazyGetProjectsDetailsByFilterQuery();

  // Line Chart stats
  const [keywordFilterOptions, setKeywordFilterOptions] = useState([]);
  const [selectedFilterOption, setSelectedFilterOption] = useState("All");
  const [filterTimes, setFilterTimes] = useState(getFilterTimes());
  const [selectedTimeOption, setSelectedTimeOption] = useState(
    getFilterTimes()[1],
  );

  const [newProjects, setNewProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [canceledProjects, setCanceledProjects] = useState([]);

  const { data: activeProjectsData } = useGetActiveProjectsAnalyticsQuery();
  const [getFinishedProject, { data: finishedProjectData }] =
    useLazyGetFinishProjectsAnalyticsQuery();
  const [getProjectsBuyer, { data: ProjectBuyersData }] =
    useLazyGetProjectBuyersAnalyticsQuery();
  const [getProjectOptions, { data: ProjectOptionsData }] =
    useLazyGetProjectOptionsAnalyticsQuery();
  const [getAvarageSelling, { data: avgSellingData }] =
    useLazyGetAvarageSellingAnalyticsQuery();

  useEffect(() => {
    if (selectedTimeOption) {
      getProjectDetails({ date: selectedTimeOption });
    }
  }, [selectedTimeOption, getProjectDetails]);

  useEffect(() => {
    if (projectDetailsData) {
      const allNewProjects = projectDetailsData?.map((item) => ({
        items: item.newOrders,
        earning: item.newOrdersEarnings,
      }));
      const allCompletedProjects = projectDetailsData?.map((item) => ({
        items: item.completedOrders,
        earning: item.completedOrdersEarnings,
      }));
      const allCanceledProjects = projectDetailsData?.map((item) => ({
        items: item.canceledOrders,
        earning: item.canceledOrdersEarnings,
      }));
      setNewProjects(allNewProjects);
      setCompletedProjects(allCompletedProjects);
      setCanceledProjects(allCanceledProjects);
    }
  }, [projectDetailsData]);

  const sumNewProjects = `${newProjects?.reduce((acc, curr) => acc + parseInt(curr.items), 0)} ($${newProjects?.reduce((acc, curr) => acc + parseInt(curr.earning), 0)})`;
  const sumCompletedProjects = `${completedProjects?.reduce((acc, curr) => acc + parseInt(curr.items), 0)} ($${completedProjects?.reduce((acc, curr) => acc + parseInt(curr.earning), 0)})`;
  const sumCanceledProjects = `${canceledProjects?.reduce((acc, curr) => acc + parseInt(curr.items), 0)} ($${canceledProjects?.reduce((acc, curr) => acc + parseInt(curr.earning), 0)})`;

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
            <span className="text-sm font-medium">
              New Projects {sumNewProjects}
            </span>
          </div>
          <div className="flex w-full shrink-0 items-center gap-3 md:w-auto">
            <div className="h-[10px] w-[10px] shrink-0 rounded-full bg-primary"></div>
            <span className="text-sm font-medium">
              Completed Projects {sumCompletedProjects}
            </span>
          </div>
          <div className="flex w-full shrink-0 items-center gap-3 md:w-auto">
            <div className="h-[10px] w-[10px] shrink-0 rounded-full bg-revision"></div>
            <span className="text-sm font-medium">
              Cancelled Projects {sumCanceledProjects}
            </span>
          </div>
          <select
            value={selectedFilterOption}
            onChange={(e) => setSelectedFilterOption(e.target.value)}
            className="shrink-0 border px-2 py-1 text-sm outline-none sm:text-base bg-white"
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
            className="shrink-0 border px-2 py-1 text-sm outline-none sm:text-base bg-white"
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
          handler={getFinishedProject}
          filter={true}
        />
        <HorizontalBarChart
          data={ProjectOptionsData}
          title={"Project Options"}
          filter={true}
          handler={getProjectOptions}
        />
        <HorizontalBarChart
          data={ProjectBuyersData}
          title={"Project Buyers"}
          handler={getProjectsBuyer}
          filter={true}
        />
        <HorizontalBarChart
          data={avgSellingData}
          title={"Avg Selling Price"}
          color={{ custom: "#7ba7c2", direct: "#9258c8" }}
          filter={true}
          handler={getAvarageSelling}
          dollarSign={true}
        />
      </div>
    </>
  );
};

export default ProjectDetailsData;
