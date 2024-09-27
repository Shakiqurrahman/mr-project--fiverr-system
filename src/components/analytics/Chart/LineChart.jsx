import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
);

const LineChart = ({
  selectedTimeOption,
  selectedLegend,
  setDatasetLabels,
}) => {
  const [labels, setLabels] = useState([]);
  const [totalVisitors, setTotalVisitors] = useState([]);
  const [newVisitors, setNewVisitors] = useState([]);
  const [returningVisitors, setReturningVisitors] = useState([]);

  const generateLabels = (option) => {
    const currentDate = new Date();
    const labels = [];
    const totalVisitors = [];
    const newVisitors = [];
    const returningVisitors = [];

    switch (option) {
      case "Last 7 Days": {
        for (let i = 6; i >= 0; i--) {
          const date = new Date(currentDate);
          date.setDate(currentDate.getDate() - i);

          totalVisitors.push(Math.floor(Math.random() * 100));
          newVisitors.push(Math.floor(Math.random() * 50));
          returningVisitors.push(Math.floor(Math.random() * 30));

          labels.push(
            date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
          );
        }
        break;
      }
      case "Last 30 Days": {
        for (let i = 29; i >= 0; i--) {
          const date = new Date(currentDate);
          date.setDate(currentDate.getDate() - i);

          totalVisitors.push(Math.floor(Math.random() * 100));
          newVisitors.push(Math.floor(Math.random() * 50));
          returningVisitors.push(Math.floor(Math.random() * 30));

          labels.push(
            date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
          );
        }
        break;
      }
      case "Last Month": {
        const lastMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
        );
        const totalDays = new Date(
          lastMonth.getFullYear(),
          lastMonth.getMonth() + 1,
          0,
        ).getDate();

        for (let i = 1; i <= totalDays; i++) {
          const date = new Date(
            lastMonth.getFullYear(),
            lastMonth.getMonth(),
            i,
          );
          totalVisitors.push(Math.floor(Math.random() * 100));
          newVisitors.push(Math.floor(Math.random() * 50));
          returningVisitors.push(Math.floor(Math.random() * 30));

          labels.push(
            date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
          );
        }
        break;
      }
      // Include other cases (Last 3 Months, Last 6 Months, etc.) similar to above
      default:
        break;
    }

    setLabels(labels);
    setTotalVisitors(totalVisitors);
    setNewVisitors(newVisitors);
    setReturningVisitors(returningVisitors);
  };

  useEffect(() => {
    generateLabels(selectedTimeOption);
  }, [selectedTimeOption]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total Visitors",
        data: totalVisitors,
        fill: false,
        borderColor: "#1b8cdc",
        backgroundColor: "#1b8cdc",
        tension: 0.1,
        pointRadius: 5,
      },
      {
        label: "New Visitors",
        data: newVisitors,
        fill: false,
        borderColor: "#078510",
        backgroundColor: "#078510",
        tension: 0.1,
        pointRadius: 5,
      },
      {
        label: "Returning Visitors",
        data: returningVisitors,
        fill: false,
        borderColor: "#9d0e66",
        backgroundColor: "#9d0e66",
        tension: 0.1,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          color: "#1b8cdc", // Customize grid line color
        },
        ticks: {
          color: "#1b8cdc", // Change this to your desired color
          callback: function (val, index) {
            // Hide every 2nd tick label
            return index % 4 === 0 ? this.getLabelForValue(val) : "";
          },
          // Custom tick callback to format date labels
          // callback: (value) => {
          //   const strValue = data.labels[value]; // Get the correct label from data.labels
          //   const parts = strValue.split(" "); // Split the date string
          //   return parts.length === 3
          //     ? [`${parts[0]} ${parts[1]}`, parts[2]] // Show "Nov 5" on one line and "2023" on another
          //     : [strValue]; // Fallback to original value
          // },
          autoSkip: false, // Prevent automatic skipping of labels
          align: "center", // Align ticks to center
        },
        y: {
          suggestedMax: 200,
          ticks: {
            stepSize: 50,
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.raw;

            return ` ${label}: ${value}`;
          },
        },
        backgroundColor: "#fff", // Tooltip background color
        titleColor: "#1b8cdc", // Title color
        titleFont: {
          size: 16, // Change this value to adjust the font size of the title
          weight: "600", // Optional: set the font weight
        },
        bodyColor: "black", // Body text color
        borderColor: "rgba(0, 0, 0, 0.125)",
        borderWidth: 1,
        padding: 15,
        cornerRadius: 10,
        usePointStyle: true,
      },
      legend: {
        display: false,
      },
      // Custom plugin for drawing ticks with different colors
      // Custom plugin for drawing ticks with different colors
      beforeDraw: (chart) => {
        const ctx = chart.ctx;
        const xAxis = chart.scales.x;

        ctx.save();
        ctx.font = `${xAxis.options.ticks.fontSize}px ${xAxis.options.ticks.fontStyle} ${xAxis.options.ticks.fontFamily}`;

        xAxis.ticks.forEach((tick, index) => {
          if (index % 5 === 0) {
            ctx.fillStyle = "#ff0000"; // Change color for every 5th tick
          } else {
            ctx.fillStyle = "#1b8cdc"; // Default color for other ticks
          }

          const x = xAxis.getPixelForTick(index);
          const y = xAxis.bottom + 20; // Position below the axis
          ctx.fillText(tick.label, x, y);
        });

        ctx.restore();
      },
    },
  };
  // Extract dataset labels for the select options
  const datasetLabels = [
    "All",
    ...data.datasets.map((dataset) => dataset.label),
  ];

  useEffect(() => {
    setDatasetLabels(datasetLabels);
  }, [setDatasetLabels]);

  // Filter datasets based on selected option
  const filteredDatasets =
    selectedLegend === "All"
      ? data.datasets
      : data.datasets.filter((dataset) => dataset.label === selectedLegend);

  // Update data to show filtered datasets
  const filteredData = {
    labels: data.labels,
    datasets: filteredDatasets,
  };

  return (
    <div>
      <Line options={options} data={filteredData} />
    </div>
  );
};

export default LineChart;
