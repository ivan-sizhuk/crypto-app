import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { fetchBitcoinChartData } from "../../lib/slices/bitcoinChartSlice";
import { Chart as ChartJS, LineElement, LinearScale, CategoryScale, PointElement } from "chart.js";
import LoadingSpinner from "./loadingSpinner";

ChartJS.register(LineElement, LinearScale, CategoryScale, PointElement);

const BitcoinPriceChart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { prices, loading, error } = useAppSelector((state) => state.bitcoinChart);

  useEffect(() => {
    dispatch(fetchBitcoinChartData());
  }, [dispatch]);

  const chartData = {
    labels: new Array(prices.length).fill(""),
    datasets: [
      {
        data: prices,
        borderColor: "#9f7aea",
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 4,
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
    <div className="w-full h-full min-h-[300px] min-w-full">
      {loading && <LoadingSpinner />}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <Line data={chartData} options={chartOptions} />}
    </div>
  );
};

export default BitcoinPriceChart;
