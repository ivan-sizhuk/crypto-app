import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { fetchBitcoinChartData } from "../../lib/slices/bitcoinChartSlice";
import { Chart as ChartJS, LineElement, LinearScale, CategoryScale, PointElement } from "chart.js";

ChartJS.register(LineElement, LinearScale, CategoryScale, PointElement);

const BitcoinPriceChart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { prices, loading, error } = useAppSelector((state) => state.bitcoinChart);

  useEffect(() => {
    dispatch(fetchBitcoinChartData());
  }, [dispatch]);

  const borderColor = prices[0] <= prices[prices.length - 1] ? "green" : "red";

  const chartData = {
    labels: new Array(prices.length).fill(""),
    datasets: [
      {
        data: prices,
        borderColor,
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
    <div style={{ width: "100%", height: "100%", minHeight: "300px", minWidth: "100%" }}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <Line data={chartData} options={chartOptions} />}
    </div>
  );
};

export default BitcoinPriceChart;
