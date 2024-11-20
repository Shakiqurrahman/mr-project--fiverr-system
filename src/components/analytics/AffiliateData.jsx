import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DownArrow from "../../assets/svg/DownArrow";
import UpArrow from "../../assets/svg/UpArrow";
import { useLazyGetAllAffiliatesQuery } from "../../Redux/api/affiliateApiSlice";

const AffiliateData = () => {
  const [expend, setExpend] = useState(false);
  const [selectedFilterOption, setSelectedFilterOption] = useState("Earnings");
  const [selectedTimeOption, setSelectedTimeOption] = useState("Last 30 Days");
  const [affiliateData, setAffiliateData] = useState([]);

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
    if (affiliatesData) {
      const data = affiliatesData?.map((item) => ({
        joinedUsers: item?.joinedUsers?.map((join) => ({
          ...join,
          affiliateOwner: item?.affiliateOwner,
        })),
      }));
      const flattenData = data?.map((entry) => entry?.joinedUsers).flat();
      setAffiliateData(flattenData);
    }
  }, [affiliatesData]);

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

  const slicedAffiliateData =
    affiliateData?.length > 10 && !expend
      ? affiliateData?.slice(0, 10)
      : affiliateData;

  console.log("slicedAffiliateData", slicedAffiliateData);
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
              {slicedAffiliateData?.map((item, idx) => (
                <tr key={idx} className="text-center even:bg-white">
                  <td className="border-collapse border border-gray-300 px-3 py-2 text-start">
                    <Link to={`/${item?.userName}`}>{item?.userName}</Link>
                  </td>
                  <td className="border-collapse border border-gray-300 px-3 py-2 text-start">
                    <Link to={`/${item?.affiliateOwner?.userName}`}>
                      {item?.affiliateOwner?.userName}
                    </Link>
                  </td>
                  <td className="border-collapse border border-gray-300 px-3 py-2">
                    {item?.totalOrders}
                  </td>
                  <td className="border-collapse border border-gray-300 px-3 py-2">
                    ${item?.totalAmount}
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
