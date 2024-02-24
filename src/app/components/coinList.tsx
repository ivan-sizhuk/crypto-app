import { useCoinData } from "../utilities/fetchCoinList";

interface CryptoData {
  name: string;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  circulating_supply: number;
  total_supply: number;
}

const CoinList: React.FC = () => {
  const cryptoData: CryptoData[] = useCoinData();

  return (
    <div className="mt-4">
      {cryptoData.map((crypto, index) => (
        <div
          key={index}
          className="my-1 h-16 bg-indigo-950 hover:bg-indigo-900 transition duration-200 ease-in-out text-white flex items-center justify-between rounded-xl cursor-pointer"
        >
          <span>{index + 1}</span>
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
