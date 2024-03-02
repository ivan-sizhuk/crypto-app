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
    <ul className="mt-4">
      {cryptoData.map((crypto) => (
        <li key={crypto.id} className="container min-w-full my-1 h-16 flex items-center justify-between cursor-pointer">
          <span className="border border-red-800">{crypto.market_cap_rank}</span>
          <span className="border border-red-800 flex items-center">
            <img className="w-7 mr-3" src={crypto.image} alt={"img"} />
            <span className="">{crypto.name}</span>
          </span>
          <span className="border border-red-800">${crypto.current_price.toLocaleString()}</span>
          <span className="border border-red-800">{crypto.price_change_percentage_1h_in_currency.toFixed(1)}%</span>
          <span className="border border-red-800">{crypto.price_change_percentage_24h_in_currency.toFixed(1)}%</span>
          <span className="border border-red-800">{crypto.price_change_percentage_7d_in_currency.toFixed(1)}%</span>
          <span className="border border-red-800">${crypto.market_cap}</span>
          <span className="border border-red-800">${crypto.total_volume}</span>
          <span className="mr-2">{crypto.circulating_supply}</span>
          <div className="h-4 w-32 bg-gray-200">
            <div
              className="h-full bg-green-500"
              style={{ width: `${(parseFloat(crypto.circulating_supply) / parseFloat(crypto.total_supply)) * 100}%` }}
            ></div>
          </div>
          <span className="ml-2">{crypto.total_supply}</span>
          <span className="border border-red-800">{crypto.price_change_percentage_7d_in_currency}</span>
        </li>
      ))}
    </ul>
  );
};

export default CoinList;
