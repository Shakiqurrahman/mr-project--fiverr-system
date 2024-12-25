import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLazyGetReturnBuyersQuery } from "../../Redux/api/analyticsApiSlice";
import DownArrow from "../../assets/svg/DownArrow";
import UpArrow from "../../assets/svg/UpArrow";

const ReturnBuyers = () => {
  const [expend, setExpend] = useState(false);
  const [selectedFilterOption, setSelectedFilterOption] = useState("Earnings");
  const [selectedTimeOption, setSelectedTimeOption] = useState("Last 30 Days");
  const [returnBuyersData, setReturnBuyersData] = useState([]);

  const [getReturnBuyers, { data: returnBuyers }] =
    useLazyGetReturnBuyersQuery();

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
    return [...returnBuyersData]?.sort((a, b) => {
      if (option === "Projects") return b?.totalOrders - a?.totalOrders;
      if (option === "Earnings") return a?.totalPayments - a?.totalPayments;
      return 0;
    });
  };

  useEffect(() => {
    const sortedData = sortCategoriesData(selectedFilterOption);
    setReturnBuyersData(sortedData);
  }, [selectedFilterOption]);

  const slicedCategoriesData =
    returnBuyersData?.length > 10 && !expend
      ? returnBuyersData?.slice(0, 10)
      : returnBuyersData;

  useEffect(() => {
    if (selectedTimeOption) {
      getReturnBuyers({
        date: selectedTimeOption,
      });
    }
  }, [selectedTimeOption]);

  useEffect(() => {
    if (returnBuyers?.users) {
      setReturnBuyersData(returnBuyers?.users);
    }
  }, [returnBuyers?.users]);

  return (
    <>
      <div className="border border-gray-300 bg-lightcream">
        <div className="flex flex-wrap items-center gap-5 p-3">
          <h1 className="grow text-base font-semibold text-primary sm:text-lg">
            Repeat Buyers
          </h1>
          <select
            value={selectedFilterOption}
            onChange={(e) => setSelectedFilterOption(e.target.value)}
            className="shrink-0 border bg-white px-2 py-1 text-sm outline-none sm:text-base"
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
            className="shrink-0 border bg-white px-2 py-1 text-sm outline-none sm:text-base"
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
                <th className="w-[50%] border-collapse border border-gray-300 px-3 py-2 text-start font-semibold">
                  Username
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
              {slicedCategoriesData?.map((keyword, idx) => (
                <tr key={idx} className="text-center even:bg-white">
                  <td className="border-collapse border border-gray-300 px-3 py-2 text-start">
                    <Link to={`/${keyword?.userName}`}>
                      {keyword?.userName}
                    </Link>
                  </td>
                  <td className="border-collapse border border-gray-300 px-3 py-2">
                    {keyword?.totalOrders}
                  </td>
                  <td className="border-collapse border border-gray-300 px-3 py-2">
                    ${keyword?.totalPayments}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {slicedCategoriesData?.length === 0 && (
        <p className="bg-white py-4 text-center">No data found!</p>
      )}
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
