import { useEffect, useState } from "react";
import DownArrow from "../../assets/svg/DownArrow";
import UpArrow from "../../assets/svg/UpArrow";
import { useLazyGetTopKeywordsByFilterQuery } from "../../Redux/api/analyticsApiSlice";

const TopKeywords = () => {
  const [expend, setExpend] = useState(false);
  const [selectedFilterOption, setSelectedFilterOption] =
    useState("Impressions");
  const [selectedTimeOption, setSelectedTimeOption] = useState("Last 30 Days");
  const [keywordsData, setKeywordsData] = useState([]);

  const [getTopKeywordsByFilter, { data }] =
    useLazyGetTopKeywordsByFilterQuery();

  const lastYear = new Date().getFullYear() - 1;
  const twoYearsAgo = new Date().getFullYear() - 2;

  const keywordFilterOptions = [
    "Impressions",
    "Clicks",
    "Projects",
    "Earnings",
  ];

  const filterTimes = [
    "Last 7 Days",
    "Last 30 Days",
    "Last Month",
    "Last 3 Months",
    "Last 6 Months",
    "This Year",
    lastYear,
    twoYearsAgo,
    "All Times",
  ];

  useEffect(() => {
    if (selectedTimeOption) {
      getTopKeywordsByFilter({ date: selectedTimeOption });
    }
  }, [selectedTimeOption, getTopKeywordsByFilter]);

  useEffect(() => {
    if (data) {
      let sortedData = [...data];

      if (selectedFilterOption === "Impressions") {
        sortedData.sort((a, b) => b.impressions - a.impressions);
      }
      if (selectedFilterOption === "Clicks") {
        sortedData.sort((a, b) => b.clicks - a.clicks);
      }
      if (selectedFilterOption === "Projects") {
        sortedData.sort((a, b) => b.totalOrders - a.totalOrders);
      }
      if (selectedFilterOption === "Earnings") {
        sortedData.sort((a, b) => b.totalSales - a.totalSales);
      }

      setKeywordsData(sortedData);
    }
  }, [selectedFilterOption, data]);

  const slicedKeywordData =
    keywordsData?.length > 10 && !expend
      ? keywordsData?.slice(0, 10)
      : keywordsData;

  return (
    <>
      <div className="border border-gray-300 bg-lightskyblue">
        <div className="flex flex-wrap items-center gap-5 p-3">
          <h1 className="grow text-base font-semibold text-primary sm:text-lg">
            Top Keywords
          </h1>
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
        <div className="preview-scroll-overflow-x !pb-0">
          <table className="table w-full border-collapse border">
            <thead>
              <tr className="bg-white">
                <th className="w-[40%] border-collapse border border-gray-300 px-3 py-2 text-start font-semibold">
                  Keyword
                </th>
                <th className="w-[15%] border-collapse border border-gray-300 px-3 py-2 font-semibold">
                  Impressions
                </th>
                <th className="w-[15%] border-collapse border border-gray-300 px-3 py-2 font-semibold">
                  Clicks
                </th>
                <th className="w-[15%] border-collapse border border-gray-300 px-3 py-2 font-semibold">
                  Projects
                </th>
                <th className="w-[15%] border-collapse border border-gray-300 px-3 py-2 font-semibold">
                  Earnings
                </th>
              </tr>
            </thead>
            <tbody>
              {slicedKeywordData?.map((keyword, index) => (
                <tr key={index} className="text-center even:bg-white">
                  <td className="border-collapse border border-gray-300 px-3 py-2 text-start">
                    {keyword?.name}
                  </td>
                  <td className="border-collapse border border-gray-300 px-3 py-2">
                    {keyword?.impressions}
                  </td>
                  <td className="border-collapse border border-gray-300 px-3 py-2">
                    {keyword?.clicks}
                  </td>
                  <td className="border-collapse border border-gray-300 px-3 py-2">
                    {keyword?.totalOrders}
                  </td>
                  <td className="border-collapse border border-gray-300 px-3 py-2">
                    ${keyword?.totalSales}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {keywordsData?.length > 10 && (
        <button
          className="mx-auto mt-5 flex items-center gap-1 rounded-[30px] bg-primary px-3 py-1 text-white"
          onClick={() => setExpend(!expend)}
        >
          {expend ? (
            <>
              See Less <UpArrow />
            </>
          ) : (
            <>
              See More <DownArrow />
            </>
          )}
        </button>
      )}
    </>
  );
};

export default TopKeywords;
