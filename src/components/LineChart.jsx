import React from "react";
import { Line } from "react-chartjs-2";

import { Chart as ChartJS, CategoryScale, Filler,LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({data}) => {
    const labels = Object.keys(data);
    const amounts = Object.values(data);

    const chartData = {
    labels,
    datasets: [
      {
        label: 'Total Expense',
        data: amounts,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0,  // smooth curves
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expenses Over Last 5 Days',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        }
      },
      y: {
        title: {
          display: true,
          text: 'Amount (₹)',
        },
        beginAtZero: true,
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;

