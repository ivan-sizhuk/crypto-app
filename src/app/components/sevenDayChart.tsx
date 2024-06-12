import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, LinearScale, CategoryScale, PointElement } from "chart.js";

ChartJS.register(LineElement, LinearScale, CategoryScale, PointElement);

interface SevenDayChartProps {
  data: number[];
}

const SevenDayChart: React.FC<SevenDayChartProps> = ({ data }) => {
  const borderColor = data[0] <= data[data.length - 1] ? "green" : "red";

  const chartData = {
    labels: new Array(data.length).fill(""),
    datasets: [
      {
        data,
        borderColor,
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "50px", minWidth: "100px" }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default SevenDayChart;
