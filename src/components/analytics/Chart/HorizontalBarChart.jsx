import React, { useState } from "react";

const HorizontalBarChart = ({ data, title, color }) => {
  // Extract category names and values
  const categories = Object.keys(data);
  const values = Object.values(data);

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
  };

  // Merge the provided color prop with defaultColorMapping (priority to color prop)
  const colorMapping = { ...defaultColorMapping, ...color };

  // Calculate the total value
  const totalValue = values.reduce((sum, value) => sum + value, 0);

  // Calculate percentages for each part
  const percentages = values.map((value) => {
    return totalValue > 0 ? (value / totalValue) * 100 : 0;
  });

  // State to track the hovered index
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="mb-14 flex flex-col items-center">
      <div className="w-full">
        {/* Custom Legend */}
        <div className="relative mb-6 flex flex-col items-center gap-4 md:flex-row">
          <h2 className="text-xl font-semibold text-primary">{title}</h2>
          <div className="absolute left-1/2 top-1/2 flex flex-1 -translate-x-1/2 -translate-y-1/2 flex-wrap items-center justify-center">
            {categories.map((label, index) => (
              <div className="mx-2 flex items-center" key={index}>
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: colorMapping[label] || "#ccc" }} // Fallback color
                />
                <span className="ml-1">
                  {label.charAt(0).toUpperCase() + label.slice(1)} (
                  {values[index]})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Full-width Single Bar */}
        <div className="mb-5 flex w-full items-center">
          <div className="relative w-full flex-1">
            <div className="flex rounded-[20px] bg-white p-1">
              {percentages.map((percentage, index) => {
                return (
                  <div
                    key={index}
                    className={`flex h-6 transition-opacity duration-200 first:rounded-l-[20px] last:rounded-r-[20px]`}
                    style={{
                      // left: `${leftOffset}%`,
                      width: `${percentage}%`,
                      backgroundColor:
                        colorMapping[categories[index]] || "#ccc",
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
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="absolute left-1 top-[-5px] z-[-2] flex h-[calc(100%_+_10px)] w-[calc(100%_-_8px)]">
              {percentages.map((percentage, index) => {
                const leftOffset = percentages
                  .slice(0, index)
                  .reduce((sum, pct) => sum + pct, 0);
                return (
                  <div
                    key={index}
                    className={`asbolute top-0 h-full transition-opacity duration-200 first:rounded-l-[20px] last:rounded-r-[20px]`}
                    style={{
                      left: `calc(${leftOffset}% - 5px)`,
                      width: `${percentage}%`,
                      backgroundColor:
                        colorMapping[categories[index]] || "#ccc",
                      cursor: "pointer",
                    }}
                  ></div>
                );
              })}
            </div>
            <div className="absolute left-[-5px] top-[-5px] z-[-3] flex h-[calc(100%_+_10px)] w-[calc(100%_+_10px)]">
              {percentages.map((percentage, index) => {
                const leftOffset = percentages
                  .slice(0, index)
                  .reduce((sum, pct) => sum + pct, 0);
                return (
                  <div
                    key={index}
                    className={`asbolute top-0 h-full transition-opacity duration-200 first:rounded-l-[20px] last:rounded-r-[20px]`}
                    style={{
                      left: `calc(${leftOffset}% - 5px)`,
                      width: `${percentage}%`,
                      backgroundColor:
                        colorMapping[categories[index]] || "#ccc",
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