import { useEffect, useState } from "react";
import DownArrow from "../../assets/svg/DownArrow";
import UpArrow from "../../assets/svg/UpArrow";

const CategoriesData = () => {
  const [expend, setExpend] = useState(false);
  const [selectedFilterOption, setSelectedFilterOption] = useState("Earnings");
  const [selectedTimeOption, setSelectedTimeOption] = useState("Last 30 Days");

  // @TODO: Offer Project and Custom Offer must be Included in original Data
  const [categoriesData, setCategoriesData] = useState([
    {
      id: 1,
      name: "Offer Project",
      projects: 2,
      earning: 240,
    },
    {
      id: 2,
      name: "Custom Offer",
      projects: 5,
      earning: 170,
    },
    {
      id: 3,
      name: "Door Hanger Design",
      projects: 2,
      earning: 60,
    },
    {
      id: 4,
      name: "Flyer Design",
      projects: 0,
      earning: 0,
    },
    {
      id: 5,
      name: "Postcard Design",
      projects: 3,
      earning: 120,
    },
    {
      id: 6,
      name: "Poster Design",
      projects: 0,
      earning: 0,
    },
    {
      id: 7,
      name: "Rack Card Design",
      projects: 1,
      earning: 30,
    },
    {
      id: 8,
      name: "Business Card Design",
      projects: 0,
      earning: 0,
    },
    {
      id: 9,
      name: "Brochure Design",
      projects: 0,
      earning: 0,
    },
    {
      id: 10,
      name: "Facebook cover Design",
      projects: 2,
      earning: 40,
    },
    {
      id: 11,
      name: "Billboard Design",
      projects: 3,
      earning: 75,
    },
    {
      id: 12,
      name: "Yard Sign Design",
      projects: 2,
      earning: 25,
    },
    {
      id: 13,
      name: "Yard Sign Design",
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
    return [...categoriesData].sort((a, b) => {
      if (option === "Projects") return b.projects - a.projects;
      if (option === "Earnings") return b.earning - a.earning;
      return 0;
    });
  };

  useEffect(() => {
    const sortedData = sortCategoriesData(selectedFilterOption);
    setCategoriesData(sortedData);
  }, [selectedFilterOption]);

  const slicedCategoriesData =
    categoriesData.length > 10 && !expend
      ? categoriesData.slice(0, 10)
      : categoriesData;
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
                <th className="w-[50%] border-collapse border border-gray-300 px-3 py-2 text-start font-semibold">
                  Keyword
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
                    {keyword.name}
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
