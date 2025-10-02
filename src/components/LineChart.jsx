// /*
import React from "react";

import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
  Chart as ChartJS,
  CategoryScale,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels
);

const LineChart = ({ data, title }) => {
  const labels = Object.keys(data);
  const amounts = Object.values(data);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Expense",
        data: amounts,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.1, // smooth curves
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title, // title used here
      },
      datalabels: {
        anchor: "end", // position of label
        align: "top", // align text above the point
        formatter: (value) => `₹${value}`, // format values (optional)
        font: {
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount (₹)",
        },
        beginAtZero: true,
      },
    },
  };

  return <Line className="" data={chartData} options={options} />;
};

export default LineChart;
// */

/*
// LineChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
} from "chart.js";

// Register Chart.js components + plugin
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  ChartDataLabels
);

const LineChart = ({ data, title }) => {
  const labels = Object.keys(data);
  const amounts = Object.values(data);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Expense",
        data: amounts,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.3,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
      datalabels: {
        anchor: "end",   // positions label relative to point
        align: "top",    // places label above the point
        formatter: (value) => `₹${value}`, // format label text
        font: {
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount (₹)",
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;

*/
