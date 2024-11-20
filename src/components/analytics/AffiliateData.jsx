import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DownArrow from "../../assets/svg/DownArrow";
import UpArrow from "../../assets/svg/UpArrow";
import { useLazyGetAllAffiliatesQuery } from "../../Redux/api/affiliateApiSlice";

const AffiliateData = () => {
  const [expend, setExpend] = useState(false);
  const [selectedFilterOption, setSelectedFilterOption] = useState("Earnings");
  const [selectedTimeOption, setSelectedTimeOption] = useState("Last 30 Days");
  const [affiliateData, setAffiliateData] = useState([
    {
      id: 1,
      user: "username123456",
      sender: "username123456",
      projects: 2,
      earning: 60,
    },
    {
      id: 2,
      user: "username111",
      sender: "username111",
      projects: 0,
      earning: 0,
    },
    {
      id: 3,
      user: "username121",
      sender: "username121",
      projects: 3,
      earning: 120,
    },
    {
      id: 4,
      user: "username1331",
      sender: "username1331",
      projects: 0,
      earning: 0,
    },
    {
      id: 5,
      user: "username11",
      sender: "username11",
      projects: 1,
      earning: 30,
    },
    {
      id: 6,
      user: "username1736",
      sender: "username1736",
      projects: 0,
      earning: 0,
    },
    {
      id: 7,
      user: "username13645",
      sender: "username13645",
      projects: 0,
      earning: 0,
    },
    {
      id: 8,
      user: "username1958",
      sender: "username1958",
      projects: 2,
      earning: 40,
    },
    {
      id: 9,
      user: "username132543",
      sender: "username132543",
      projects: 3,
      earning: 75,
    },
    {
      id: 10,
      user: "username112221",
      sender: "username112221",
      projects: 1,
      earning: 25,
    },
    {
      id: 11,
      user: "username123456",
      sender: "username123456",
      projects: 1,
      earning: 25,
    },
  ]);

  const [getAllAffiliates, { data: affiliatesData, isLoading }] =
    useLazyGetAllAffiliatesQuery();

  console.log(affiliatesData, "aff");

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

  const sortAffiliateData = (option) => {
    return [...affiliateData].sort((a, b) => {
      if (option === "Projects") return b.projects - a.projects;
      if (option === "Earnings") return b.earning - a.earning;
      return 0;
    });
  };

  useEffect(() => {
    const sortedData = sortAffiliateData(selectedFilterOption);
    setAffiliateData(sortedData);
  }, [selectedFilterOption]);

  useEffect(() => {
    if (selectedTimeOption) {
      getAllAffiliates({
        timeFilter: selectedTimeOption,
        keywordFilter: selectedFilterOption,
      });
    }
  }, [selectedTimeOption, getAllAffiliates, selectedFilterOption]);

  const slicedKeywordData =
    affiliatesData?.length > 10 && !expend
      ? affiliatesData?.slice(0, 10)
      : affiliatesData;
  return (
    <>
      <div className="border border-gray-300 bg-lightcream">
        <div className="flex flex-wrap items-center gap-5 p-3">
          <h1 className="grow text-base font-semibold text-primary sm:text-lg">
            Affiliate
          </h1>
          <select
            value={selectedFilterOption}
            onChange={(e) => setSelectedFilterOption(e.target.value)}
            className="shrink-0 border px-2 py-1 text-sm outline-none sm:text-base"
          >
            {keywordFilterOptions?.map((key, i) => (
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
            {filterTimes?.map((key, i) => (
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
                <th className="w-[38%] border-collapse border border-gray-300 px-3 py-2 text-start font-semibold">
                  User
                </th>
                <th className="w-[38%] border-collapse border border-gray-300 px-3 py-2 text-start font-semibold">
                  Sender
                </th>
                <th className="w-[12%] border-collapse border border-gray-300 px-3 py-2 font-semibold">
                  Projects
                </th>
                <th className="w-[12%] border-collapse border border-gray-300 px-3 py-2 font-semibold">
                  Earnings
                </th>
              </tr>
            </thead>
            <tbody>
              {slicedKeywordData?.map((keyword, idx) => (
                <tr key={idx} className="text-center even:bg-white">
                  <td className="border-collapse border border-gray-300 px-3 py-2 text-start">
                    <Link to={`/${keyword?.joinedUsers[0]?.userName}`}>
                      {keyword?.joinedUsers[0]?.userName}
                    </Link>
                  </td>
                  <td className="border-collapse border border-gray-300 px-3 py-2 text-start">
                    <Link to={`/${keyword?.affiliateOwner?.userName}`}>
                      {keyword?.affiliateOwner?.userName}
                    </Link>
                  </td>
                  <td className="border-collapse border border-gray-300 px-3 py-2">
                    {keyword.projects}
                  </td>
                  <td className="border-collapse border border-gray-300 px-3 py-2">
                    ${keyword?.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {affiliateData.length > 10 && (
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

export default AffiliateData;
