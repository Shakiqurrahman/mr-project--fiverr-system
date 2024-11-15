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
import { useLazyGetVisitorsByFilterQuery } from "../../../Redux/api/analyticsApiSlice";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
);

// Define the custom plugin for grid lines
const customGridLinesPlugin = {
  id: "customGridLines",
  beforeDraw: (chart) => {
    const ctx = chart.ctx;
    const xAxis = chart.scales.x;

    // Draw x-axis grid lines
    ctx.save();
    ctx.lineWidth = 1; // Set a sufficient line width
    xAxis.ticks.forEach((tick, index) => {
      ctx.beginPath();
      ctx.moveTo(xAxis.getPixelForTick(index), chart.chartArea.top);
      ctx.lineTo(xAxis.getPixelForTick(index), chart.chartArea.bottom);

      // Set color based on index
      ctx.strokeStyle =
        index === 0 || (index - 4) % 5 === 0 ? "#1b8cdc" : "#ddd";
      ctx.stroke();
    });

    ctx.restore();
  },
};

const VisitorLineChart = ({
  selectedTimeOption,
  selectedLegend,
  setDatasetLabels,
}) => {
  const [labels, setLabels] = useState([]);
  const [totalVisitors, setTotalVisitors] = useState([]);
  const [newVisitors, setNewVisitors] = useState([]);
  const [returningVisitors, setReturningVisitors] = useState([]);

  const [getAllVisitorsByTime, { data: visitorsData }] =
    useLazyGetVisitorsByFilterQuery();

  console.log(visitorsData);

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

          totalVisitors.push(Math.floor(visitorsData?.totalVisitors || 0));
          newVisitors.push(Math.floor(visitorsData?.newVisitors || 0));
          returningVisitors.push(
            Math.floor(visitorsData?.ReturningVisitors || 0),
          );

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

          totalVisitors.push(Math.floor(visitorsData?.totalVisitors || 0));
          newVisitors.push(Math.floor(visitorsData?.totalVisitors || 0));
          returningVisitors.push(Math.floor(visitorsData?.totalVisitors || 0));

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
          totalVisitors.push(Math.floor(visitorsData?.totalVisitors || 0));
          newVisitors.push(Math.floor(visitorsData?.totalVisitors || 0));
          returningVisitors.push(Math.floor(visitorsData?.totalVisitors || 0));

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
    if (selectedTimeOption) {
      getAllVisitorsByTime({ date: selectedTimeOption });
    }
  }, [selectedTimeOption, getAllVisitorsByTime]);

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
        pointRadius: 4,
      },
      {
        label: "New Visitors",
        data: newVisitors,
        fill: false,
        borderColor: "#078510",
        backgroundColor: "#078510",
        tension: 0.1,
        pointRadius: 4,
      },
      {
        label: "Returning Visitors",
        data: returningVisitors,
        fill: false,
        borderColor: "#9d0e66",
        backgroundColor: "#9d0e66",
        tension: 0.1,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    borderWidth: 1,
    responsive: true,
    scales: {
      x: {
        grid: {
          color: "#ddd", // Customize grid line color
        },
        ticks: {
          color: "#1b8cdc", // Change this to your desired color
          maxRotation: 0, // Prevent rotation of labels
          minRotation: 0, // Prevent rotation of labels
          callback: function (val, index) {
            const strValue = data.labels[val]; // Get the correct label from data.labels
            const parts = strValue.split(","); // Split the date string
            const value = [parts[0], parts[1]];
            switch (selectedTimeOption) {
              case "Last 7 Days":
                return this.getLabelForValue(value);
              default:
                return index > 0 && (index - 4) % 5 === 0
                  ? this.getLabelForValue(value)
                  : "";
            }
          },
          autoSkip: false, // Prevent automatic skipping of labels
          align: "center", // Align ticks to center
        },
      },
      y: {
        grid: {
          color: "#ddd", // Customize grid line color
        },
        suggestedMin: 0, // Optional: Set a minimum value for better visibility
        suggestedMax: 200,
        ticks: {
          stepSize: 50, // Define step size
          callback: function (value) {
            return value; // Customize the label if needed
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
      customGridLines: true,
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
      <Line
        options={options}
        data={filteredData}
        plugins={[customGridLinesPlugin]}
      />
    </div>
  );
};

export default VisitorLineChart;
