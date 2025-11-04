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

const LineChart = ({ data, text}) => {
  const labels = Object.keys(data);
  const amounts = Object.values(data);

  const chartData = {
    labels,
    datasets: [
      {
        // label: "Total Expense",
        data: amounts,
        borderColor: "rgba(29, 78, 216, 1)",
        backgroundColor: "rgba(29, 78, 216, 0.2)",
        fill: true,
        tension: 0.1, // smooth curves
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      // Legend doesn't look good
      legend: {
        display: false,
        position: "bottom",
      },
      title: {
        display: false,
        // text: title, // title used here
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
          text: text,
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

