import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { fetchCoinData } from "../../lib/slices/coinDataSlice";

const CoinList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cryptoData, loading, error } = useAppSelector((state) => state.coinData);

  useEffect(() => {
    dispatch(fetchCoinData() as any);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || cryptoData.length === 0) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-4">
      {cryptoData.map((crypto) => (
        <div
          key={crypto.id}
          className="my-1 h-16 bg-indigo-950 hover:bg-indigo-900 transition duration-200 ease-in-out text-white flex items-center justify-between rounded-xl cursor-pointer"
        >
          <span>{crypto.market_cap_rank}</span>
          <span className="ml-2">{crypto.name}</span>
          <span className="ml-2">{crypto.current_price}</span>
          <span className="ml-2">{crypto.price_change_percentage_1h_in_currency}</span>
          <span className="ml-2">{crypto.price_change_percentage_24h_in_currency}</span>
          <span className="ml-2">{crypto.price_change_percentage_7d_in_currency}</span>
          <span className="ml-2">{crypto.total_volume}</span>
          <span className="ml-2">
            {crypto.circulating_supply}/{crypto.total_supply}
          </span>
          <span className="ml-2">{crypto.price_change_percentage_7d_in_currency}</span>
        </div>
      ))}
    </div>
  );
};

export default CoinList;
