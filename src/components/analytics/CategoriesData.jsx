import { useEffect, useState } from "react";
import { useLazyGetCategoriesDataAnalyticsQuery } from "../../Redux/api/analyticsApiSlice";
import DownArrow from "../../assets/svg/DownArrow";
import UpArrow from "../../assets/svg/UpArrow";

const CategoriesData = () => {
  const [getCategoriesData, { data: categories }] =
    useLazyGetCategoriesDataAnalyticsQuery();
  const [expend, setExpend] = useState(false);
  const [selectedFilterOption, setSelectedFilterOption] = useState("Earnings");
  const [selectedTimeOption, setSelectedTimeOption] = useState("Last 30 Days");

  // @TODO: Offer Project, Custom Offer and M-D Project must be Included in original Data
  const [categoriesData, setCategoriesData] = useState([]);

  const lastYear = new Date().getFullYear() - 1;
  const twoYearsAgo = new Date().getFullYear() - 2;

  const keywordFilterOptions = ["Projects", "Earnings"];

  const filterTimes = [
    "Last 7 Days",
    "Last 30 Days",
    "Last Month",
    "Last 3 Months",
    "Last 6 Months",
    "This Year",
    ...(lastYear && ![2022, 2023, 2024].includes(lastYear) ? [lastYear] : []),
    ...(twoYearsAgo && ![2022, 2023, 2024].includes(twoYearsAgo)
      ? [twoYearsAgo]
      : []),
    "All Times",
  ];

  const sortCategoriesData = (option) => {
    return [...categoriesData].sort((a, b) => {
      if (option === "Projects") return b.projects - a.projects;
      if (option === "Earnings") return b.Earnings - a.Earnings;
      return 0;
    });
  };

  useEffect(() => {
    const sortedData = sortCategoriesData(selectedFilterOption);
    setCategoriesData(sortedData);
  }, [selectedFilterOption]);

  useEffect(() => {
    if (selectedTimeOption) {
      getCategoriesData({ timeFilter: selectedTimeOption });
    }
  }, [selectedTimeOption]);

  useEffect(() => {
    if (categories) {
      setCategoriesData(categories);
    }
  }, [categories]);

  const slicedCategoriesData =
    categoriesData.length > 10 && !expend
      ? categoriesData.slice(0, 10)
      : categoriesData;
  return (
    <>
      <div className="border border-gray-300 bg-lightskyblue">
        <div className="flex flex-wrap items-center gap-5 p-3">
          <h1 className="grow text-base font-semibold text-primary sm:text-lg">
            Top Categories
          </h1>
          <select
            value={selectedFilterOption}
            onChange={(e) => setSelectedFilterOption(e.target.value)}
            className="shrink-0 border bg-white px-2 py-1 text-sm outline-none sm:text-base"
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
            className="shrink-0 border bg-white px-2 py-1 text-sm outline-none sm:text-base"
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
                <th className="w-[50%] border-collapse border border-gray-300 px-3 py-2 text-start font-semibold">
                  Category
                </th>
                <th className="w-[25%] border-collapse border border-gray-300 px-3 py-2 font-semibold">
                  Projects
                </th>
                <th className="w-[25%] border-collapse border border-gray-300 px-3 py-2 font-semibold">
                  Earnings
                </th>
              </tr>
            </thead>
            <tbody>
              {slicedCategoriesData.map((keyword, index) => (
                <tr key={index} className="text-center even:bg-white">
                  <td className="border-collapse border border-gray-300 px-3 py-2 text-start">
                    {keyword.name}
                  </td>
                  <td className="border-collapse border border-gray-300 px-3 py-2">
                    {keyword.projects}
                  </td>
                  <td className="border-collapse border border-gray-300 px-3 py-2">
                    ${keyword.Earnings}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {categoriesData.length > 10 && (
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

export default CategoriesData;
