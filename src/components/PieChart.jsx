import React from "react";
import { Pie } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);
const PieChart = ({ data }) => {
  // data could look like: { Food: 500, Travel: 300, Shopping: 200 }

  const labels = Object.keys(data); // ['Food', 'Travel', 'Shopping']
  const amounts = Object.values(data); // [500, 300, 200]

  const pieChartData = {
    labels: labels, // category names
    datasets: [
      {
        label: "Category-wise Expense",
        data: amounts, // amounts per category
        backgroundColor: [
          "rgb(255, 99, 132)", // Red
          "rgb(54, 162, 235)", // Blue
          "rgb(255, 205, 86)", // Yellow
          "rgb(75, 192, 192)", // Teal
          "rgb(153, 102, 255)", // Purple
          "rgb(255, 159, 64)", // Orange
        ],
        hoverOffset: 15,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right", // show category labels on the side
      },
      title: {
        display: true,
        text: "Expenses by Category",
      },
    },
  };

  return <Pie data={pieChartData} options={options} />;
};

export default PieChart;
