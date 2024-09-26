import React, { useState } from "react";

const HorizontalBarChart = ({ data, title }) => {
  // Extract category names and values
  const categories = Object.keys(data);
  const values = Object.values(data);

  // Define colors for each category using a mapping object
  const colorMapping = {
    completed: "#1b8cdc", 
    offer: "#808000", // Olive color code
    custom: "#ffa500", // Orange color
    revision: "#f1592a",
    ongoing: "#078510",
    waiting: "#9d0e66",
    delivered: "#0e97a0",
    cancelled: "#e60006",
  };

  // Calculate the total value
  const totalValue = values.reduce((sum, value) => sum + value, 0);

  // Calculate percentages for each part
  const percentages = values.map((value) => {
    return totalValue > 0 ? (value / totalValue) * 100 : 0;
  });

  // State to track the hovered index
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="flex flex-col items-center mb-14">
      <div className="w-full">
        {/* Custom Legend */}
        <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
          <h2 className="text-xl font-semibold text-primary">{title}</h2>
          <div className="flex items-center justify-center flex-1 flex-wrap">
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
          <div className="relative h-6 flex-1 overflow-hidden rounded-[20px] bg-gray-300 ">
            {percentages.map((percentage, index) => {
              const leftOffset = percentages
                .slice(0, index)
                .reduce((sum, pct) => sum + pct, 0);

              return (
                <div
                  key={index}
                  className="absolute h-full transition-opacity duration-200"
                  style={{
                    left: `${leftOffset}%`,
                    width: `${percentage}%`,
                    backgroundColor: colorMapping[categories[index]] || "#ccc", // Fallback color
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Show percentage on hover */}
                  <span
                    className={`flex h-full items-center justify-center text-xs text-white transition-opacity duration-200 ${
                      hoveredIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalBarChart;
