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
import { useLazyGetProjectsDetailsByFilterQuery } from "../../../Redux/api/analyticsApiSlice";

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

const ProjectLineChart = ({
  selectedTimeOption,
  selectedLegend,
  setDatasetLabels,
}) => {
  const [getProjectDetails, { data: projectDetailsData }] =
    useLazyGetProjectsDetailsByFilterQuery();

  const [labels, setLabels] = useState([]);
  const [newProjects, setNewProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [canceledProjects, setCanceledProjects] = useState([]);

  useEffect(() => {
    if (selectedTimeOption) {
      getProjectDetails({ date: selectedTimeOption });
    }
  }, [selectedTimeOption, getProjectDetails]);

  useEffect(() => {
    if (projectDetailsData) {
      const allLabels = projectDetailsData?.map((item) => item.date);
      const allNewProjects = projectDetailsData?.map((item) => ({
        items: item.newOrders,
        earning: item.newOrdersEarnings,
      }));
      const allCompletedProjects = projectDetailsData?.map((item) => ({
        items: item.completedOrders,
        earning: item.completedOrdersEarnings,
      }));
      const allCanceledProjects = projectDetailsData?.map((item) => ({
        items: item.canceledOrders,
        earning: item.canceledOrdersEarnings,
      }));
      setLabels(allLabels);
      setNewProjects(allNewProjects);
      setCompletedProjects(allCompletedProjects);
      setCanceledProjects(allCanceledProjects);
    }
  }, [projectDetailsData]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "New Projects",
        data: newProjects?.map((v) => v.earning),
        fill: false,
        borderColor: "#078510",
        backgroundColor: "#078510",
        tension: 0.1,
        pointRadius: 4,
      },
      {
        label: "Completed Projects",
        data: completedProjects?.map((v) => v.earning),
        fill: false,
        borderColor: "#1b8cdc",
        backgroundColor: "#1b8cdc",
        tension: 0.1,
        pointRadius: 4,
      },
      {
        label: "Cancelled Projects",
        data: canceledProjects?.map((v) => v.earning),
        fill: false,
        borderColor: "#f1592a",
        backgroundColor: "#f1592a",
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
              case "Last 30 Days":
                return index > 0 && (index - 4) % 5 === 0
                  ? this.getLabelForValue(value)
                  : "";
              case "Last Month":
                return index > 0 && (index - 4) % 5 === 0
                  ? this.getLabelForValue(value)
                  : "";
              default:
                return this.getLabelForValue(val);
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
            const index = context.dataIndex;
            switch (label) {
              case "New Projects":
                return ` ${label}: ${newProjects[index].items} ($${value})`;
              case "Completed Projects":
                return ` ${label}: ${completedProjects[index].items} ($${value})`;
              case "Cancelled Projects":
                return ` ${label}: ${canceledProjects[index].items} ($${value})`;
            }
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

export default ProjectLineChart;
