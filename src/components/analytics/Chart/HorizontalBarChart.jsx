import React, { useEffect, useState } from "react";

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
    "All Times",
  ];
};

const HorizontalBarChart = ({
  data,
  title,
  color,
  filter,
  handler,
  dollarSign,
}) => {
  const [filterTimes, setFilterTimes] = useState(getFilterTimes());
  const [selectedTimeOption, setSelectedTimeOption] = useState(
    getFilterTimes()[1],
  );

  useEffect(() => {
    if (handler) {
      if (selectedTimeOption) {
        handler({
          timeFilter: selectedTimeOption,
        });
      }
    }
  }, [selectedTimeOption]);

  // Extract category names and values
  const categories = Object.keys(data || {});
  const values = Object.values(data || {});

  const datasArray = categories
    .map((name, index) =>
      values[index] !== 0 ? { value: values[index], category: name } : null,
    )
    .filter(Boolean);

  // Default color mapping
  const defaultColorMapping = {
    completed: "#1b8cdc",
    offer: "#87b306",
    revision: "#f1592a",
    ongoing: "#078510",
    waiting: "#9d0e66",
    delivered: "#0e97a0",
    cancelled: "#e60006",
    custom: "#c0ad83",
    direct: "#f56f6c",
    "M-D Project": "#b26f70",
    "New Buyers": "#d97edb",
    "Repeat Buyers": "#49cdcb",
  };

  // Merge the provided color prop with defaultColorMapping (priority to color prop)
  const colorMapping = { ...defaultColorMapping, ...color };

  // Calculate the total value
  const totalValue = datasArray.reduce((sum, item) => sum + item.value, 0);

  // Calculate percentages for each part
  const barData = datasArray.map((item) => {
    return {
      ...item,
      percentage: totalValue > 0 ? (item.value / totalValue) * 100 : 0,
    };
  });

  // State to track the hovered index
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="mb-14 flex flex-col items-center">
      <div className="w-full">
        {/* Custom Legend */}
        <div className="relative mb-6 flex flex-col items-center gap-4 md:flex-row">
          <h2 className="shrink-0 text-xl font-semibold text-primary">
            {title}
          </h2>
          <div className="flex flex-1 grow flex-wrap items-center justify-center">
            {categories.map((label, index) => (
              <div className="mx-2 flex items-center" key={index}>
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: colorMapping[label] || "#ccc" }} // Fallback color
                />
                <span className="ml-1">
                  {label.charAt(0).toUpperCase() + label.slice(1)} (
                  {dollarSign && "$"}
                  {values[index]})
                </span>
              </div>
            ))}
          </div>
          <div className="w-auto shrink-0 text-end lg:w-[170px]">
            {filter && (
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
            )}
          </div>
        </div>

        {/* Full-width Single Bar */}
        <div className="mb-5 flex w-full items-center">
          <div className="relative w-full flex-1">
            <div className="flex rounded-[20px] bg-white p-1">
              {barData?.length === 0 && (
                <p className="mx-auto mt-2">No Data Found!</p>
              )}
              {barData?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`flex h-6 transition-opacity duration-200 first:rounded-l-[20px] last:rounded-r-[20px]`}
                    style={{
                      // left: `${leftOffset}%`,
                      width: `${item?.percentage}%`,
                      backgroundColor: colorMapping[item?.category] || "#ccc",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Show percentage on hover */}
                    <span
                      className={`flex h-full w-full items-center justify-center text-sm text-white transition-opacity duration-200 ${
                        hoveredIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {item?.percentage.toFixed(1)}%
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="absolute left-1 top-[-5px] z-[-2] flex h-[calc(100%_+_10px)] w-[calc(100%_-_8px)]">
              {barData?.map((item, index) => {
                const leftOffset = barData
                  .slice(0, index)
                  .reduce((sum, pct) => sum + pct?.percentage, 0);
                return (
                  <div
                    key={index}
                    className={`asbolute top-0 h-full transition-opacity duration-200 first:rounded-l-[20px] last:rounded-r-[20px]`}
                    style={{
                      left: `calc(${leftOffset}% - 5px)`,
                      width: `${item?.percentage}%`,
                      backgroundColor: colorMapping[item?.category] || "#ccc",
                      cursor: "pointer",
                    }}
                  ></div>
                );
              })}
            </div>
            <div className="absolute left-[-5px] top-[-5px] z-[-3] flex h-[calc(100%_+_10px)] w-[calc(100%_+_10px)]">
              {barData?.map((item, index) => {
                const leftOffset = barData
                  .slice(0, index)
                  .reduce((sum, pct) => sum + pct?.percentage, 0);
                return (
                  <div
                    key={index}
                    className={`asbolute top-0 h-full transition-opacity duration-200 first:rounded-l-[20px] last:rounded-r-[20px]`}
                    style={{
                      left: `calc(${leftOffset}% - 5px)`,
                      width: `${item?.percentage}%`,
                      backgroundColor: colorMapping[item?.category] || "#ccc",
                      cursor: "pointer",
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalBarChart;
