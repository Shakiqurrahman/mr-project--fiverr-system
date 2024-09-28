import { useEffect, useState } from "react";
import DownArrow from "../../assets/svg/DownArrow";
import UpArrow from "../../assets/svg/UpArrow";

const TopKeywords = () => {
  const [expend, setExpend] = useState(false);
  const [selectedFilterOption, setSelectedFilterOption] =
    useState("Impressions");
  const [selectedTimeOption, setSelectedTimeOption] = useState("Last 30 Days");
  const [keywordsData, setKeywordsData] = useState([
    {
      id: 1,
      name: "Door Hanger",
      impressions: 369,
      clicks: 124,
      projects: 2,
      earning: 60,
    },
    {
      id: 2,
      name: "Flyer Design",
      impressions: 350,
      clicks: 79,
      projects: 0,
      earning: 0,
    },
    {
      id: 3,
      name: "Postcard Design",
      impressions: 345,
      clicks: 93,
      projects: 3,
      earning: 120,
    },
    {
      id: 4,
      name: "Poster Design",
      impressions: 325,
      clicks: 136,
      projects: 0,
      earning: 0,
    },
    {
      id: 5,
      name: "Rack Card Design",
      impressions: 301,
      clicks: 84,
      projects: 1,
      earning: 30,
    },
    {
      id: 6,
      name: "Business Card",
      impressions: 285,
      clicks: 105,
      projects: 0,
      earning: 0,
    },
    {
      id: 7,
      name: "Brochure Design",
      impressions: 273,
      clicks: 49,
      projects: 0,
      earning: 0,
    },
    {
      id: 8,
      name: "Facebook cover",
      impressions: 245,
      clicks: 97,
      projects: 2,
      earning: 40,
    },
    {
      id: 9,
      name: "Billboard Design",
      impressions: 210,
      clicks: 20,
      projects: 3,
      earning: 75,
    },
    {
      id: 10,
      name: "Yard Sign Design",
      impressions: 190,
      clicks: 69,
      projects: 1,
      earning: 25,
    },
    {
      id: 11,
      name: "Yard Sign Design",
      impressions: 191,
      clicks: 69,
      projects: 1,
      earning: 25,
    },
  ]);

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

  const sortKeywordsData = (option) => {
    return [...keywordsData].sort((a, b) => {
      if (option === "Impressions") return b.impressions - a.impressions;
      if (option === "Clicks") return b.clicks - a.clicks;
      if (option === "Projects") return b.projects - a.projects;
      if (option === "Earnings") return b.earning - a.earning;
      return 0;
    });
  };

  useEffect(() => {
    const sortedData = sortKeywordsData(selectedFilterOption);
    setKeywordsData(sortedData);
  }, [selectedFilterOption]);

  const slicedKeywordData =
    keywordsData.length > 10 && !expend
      ? keywordsData.slice(0, 10)
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
              {slicedKeywordData.map((keyword) => (
                <tr key={keyword.id} className="text-center even:bg-white">
                  <td className="border-collapse border border-gray-300 px-3 py-2 text-start">
                    {keyword.name}
                  </td>
                  <td className="border-collapse border border-gray-300 px-3 py-2">
                    {keyword.impressions}
                  </td>
                  <td className="border-collapse border border-gray-300 px-3 py-2">
                    {keyword.clicks}
                  </td>
                  <td className="border-collapse border border-gray-300 px-3 py-2">
                    {keyword.projects}
                  </td>
                  <td className="border-collapse border border-gray-300 px-3 py-2">
                    ${keyword.earning}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {keywordsData.length > 10 && (
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
