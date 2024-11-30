import { useEffect, useState } from "react";
import { TiArrowDownThick, TiArrowUpThick } from "react-icons/ti";
import { useLazyGetVisitorsByFilterQuery } from "../../Redux/api/analyticsApiSlice";
import VisitorLineChart from "./Chart/VisitorLineChart";

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

const VisitorsData = () => {
  const [getAllVisitorsByTime, { data: visitorsData }] =
    useLazyGetVisitorsByFilterQuery();
  const [keywordFilterOptions, setKeywordFilterOptions] = useState([]);
  const [selectedFilterOption, setSelectedFilterOption] = useState("All");
  const [filterTimes, setFilterTimes] = useState(getFilterTimes());
  const [selectedTimeOption, setSelectedTimeOption] = useState(
    getFilterTimes()[1],
  );
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [newVisitors, setNewVisitors] = useState(0);
  const [returnVisitors, setReturnVisitors] = useState(0);

  const [totalVisitorsUporDown, setTotalVisitorsUporDown] = useState(false);
  const [newVisitorsUporDown, setNewVisitorsUporDown] = useState(false);
  const [returnVisitorsUporDown, setReturnVisitorsUporDown] = useState(false);

  useEffect(() => {
    if (selectedTimeOption) {
      getAllVisitorsByTime({ date: selectedTimeOption });
    }
  }, [selectedTimeOption, getAllVisitorsByTime]);

  useEffect(() => {
    if (visitorsData) {
      const allTotalVisitors = visitorsData
        ?.map((item) => item.totalVisitors)
        ?.reduce((prev, curr) => prev + parseInt(curr), 0);
      const allNewVisitors = visitorsData
        ?.map((item) => item.newVisitors)
        ?.reduce((prev, curr) => prev + parseInt(curr), 0);
      const allReturningVisitors = visitorsData
        ?.map((item) => item.returningVisitors)
        .reduce((prev, curr) => prev + parseInt(curr), 0);
      setTotalVisitors(allTotalVisitors);
      setNewVisitors(allNewVisitors);
      setReturnVisitors(allReturningVisitors);

      const totalUpDown =
        parseInt(visitorsData[visitorsData?.length - 1]?.totalVisitors) >=
        parseInt(visitorsData[visitorsData?.length - 2]?.totalVisitors);
      const newUpDown =
        parseInt(visitorsData[visitorsData?.length - 1]?.newVisitors) >=
        parseInt(visitorsData[visitorsData?.length - 2]?.newVisitors);
      const returnUpDown =
        parseInt(visitorsData[visitorsData?.length - 1]?.returningVisitors) >=
        parseInt(visitorsData[visitorsData?.length - 2]?.returningVisitors);
      setTotalVisitorsUporDown(totalUpDown);
      setNewVisitorsUporDown(newUpDown);
      setReturnVisitorsUporDown(returnUpDown);
    }
  }, [visitorsData]);

  return (
    <div className="bg-lightskyblue p-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="w-full text-lg font-semibold xl:w-auto">
          Visitors Overview
        </h1>
        <div className="flex w-full shrink-0 items-center gap-3 md:w-auto">
          <div className="h-[10px] w-[10px] shrink-0 rounded-full bg-primary"></div>
          <span className="font-medium">
            Total Visitors {totalVisitors || 0}
          </span>
          <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-white">
            {totalVisitorsUporDown ? (
              <TiArrowUpThick className="text-black/50" />
            ) : (
              <TiArrowDownThick className="text-revision" />
            )}
          </div>
        </div>
        <div className="flex w-full shrink-0 items-center gap-3 md:w-auto">
          <div className="h-[10px] w-[10px] shrink-0 rounded-full bg-ongoing"></div>
          <span className="font-medium">New Visitors {newVisitors || 0}</span>
          <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-white">
            {newVisitorsUporDown ? (
              <TiArrowUpThick className="text-black/50" />
            ) : (
              <TiArrowDownThick className="text-revision" />
            )}
          </div>
        </div>
        <div className="flex w-full shrink-0 items-center gap-3 md:w-auto">
          <div className="h-[10px] w-[10px] shrink-0 rounded-full bg-waiting"></div>
          <span className="font-medium">
            Returning Visitors {returnVisitors || 0}
          </span>
          <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-white">
            {returnVisitorsUporDown ? (
              <TiArrowUpThick className="text-black/50" />
            ) : (
              <TiArrowDownThick className="text-revision" />
            )}
          </div>
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
        <VisitorLineChart
          selectedTimeOption={selectedTimeOption}
          selectedLegend={selectedFilterOption}
          setDatasetLabels={setKeywordFilterOptions}
        />
      </div>
    </div>
  );
};

export default VisitorsData;
