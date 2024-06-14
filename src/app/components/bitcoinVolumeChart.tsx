import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { fetchBitcoinChartData } from "../../lib/slices/bitcoinChartSlice";
import { Chart as ChartJS, BarElement, LinearScale, CategoryScale } from "chart.js";
import LoadingSpinner from "./loadingSpinner";

ChartJS.register(BarElement, LinearScale, CategoryScale);

const BitcoinVolumeChart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { volumes, loading, error } = useAppSelector((state) => state.bitcoinChart);

  useEffect(() => {
    dispatch(fetchBitcoinChartData());
  }, [dispatch]);

  const chartData = {
    labels: new Array(volumes.length).fill(""),
    datasets: [
      {
        data: volumes,
        backgroundColor: "#9f7aea", // Tailwind CSS bg-purple-500
        borderColor: "#9f7aea",
        borderWidth: 1,
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
        display: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "300px", minWidth: "100%" }}>
      {loading && <LoadingSpinner />}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <Bar data={chartData} options={chartOptions} />}
    </div>
  );
};

export default BitcoinVolumeChart;
