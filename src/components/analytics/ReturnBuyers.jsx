import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DownArrow from "../../assets/svg/DownArrow";
import UpArrow from "../../assets/svg/UpArrow";

const ReturnBuyers = () => {
  const [expend, setExpend] = useState(false);
  const [selectedFilterOption, setSelectedFilterOption] = useState("Earnings");
  const [selectedTimeOption, setSelectedTimeOption] = useState("Last 30 Days");
  const [returnBuyersData, setReturnBuyersData] = useState([
    {
      id: 1,
      userName: "username121",
      projects: 2,
      earning: 60,
    },
    {
      id: 2,
      userName: "username132543",
      projects: 0,
      earning: 0,
    },
    {
      id: 3,
      userName: "username123456",
      projects: 3,
      earning: 120,
    },
    {
      id: 4,
      userName: "username1958",
      projects: 0,
      earning: 0,
    },
    {
      id: 5,
      userName: "username11",
      projects: 1,
      earning: 30,
    },
    {
      id: 6,
      userName: "username112221",
      projects: 0,
      earning: 0,
    },
    {
      id: 7,
      userName: "username123456",
      projects: 0,
      earning: 0,
    },
    {
      id: 8,
      userName: "username111",
      projects: 2,
      earning: 40,
    },
    {
      id: 9,
      userName: "username1331",
      projects: 3,
      earning: 75,
    },
    {
      id: 10,
      userName: "username1736",
      projects: 2,
      earning: 25,
    },
    {
      id: 11,
      userName: "username13645",
      projects: 1,
      earning: 30,
    },
  ]);

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
    lastYear,
    twoYearsAgo,
    "All Times",
  ];

  const sortCategoriesData = (option) => {
    return [...returnBuyersData].sort((a, b) => {
      if (option === "Projects") return b.projects - a.projects;
      if (option === "Earnings") return b.earning - a.earning;
      return 0;
    });
  };

  useEffect(() => {
    const sortedData = sortCategoriesData(selectedFilterOption);
    setReturnBuyersData(sortedData);
  }, [selectedFilterOption]);

  const slicedCategoriesData =
    returnBuyersData.length > 10 && !expend
      ? returnBuyersData.slice(0, 10)
      : returnBuyersData;
  return (
    <>
      <div className="border border-gray-300 bg-lightcream">
        <div className="flex flex-wrap items-center gap-5 p-3">
          <h1 className="grow text-base font-semibold text-primary sm:text-lg">
            Return Buyers
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
                <th className="w-[50%] border-collapse border border-gray-300 px-3 py-2 text-start font-semibold">
                  UserName
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
              {slicedCategoriesData.map((keyword) => (
                <tr key={keyword.id} className="text-center even:bg-white">
                  <td className="border-collapse border border-gray-300 px-3 py-2 text-start">
                    <Link to={`/${keyword.userName}`}>{keyword.userName}</Link>
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
      {returnBuyersData.length > 10 && (
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

export default ReturnBuyers;
