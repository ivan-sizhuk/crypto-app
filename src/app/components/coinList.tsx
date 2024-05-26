import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { fetchCoinData } from "../../lib/slices/coinListSlice";
import Link from "next/link";

const CoinList: React.FC = () => {
  const dispatch = useAppDispatch(10);
  const { cryptoData, loading, error } = useAppSelector((state) => state.coinData);
  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    dispatch(fetchCoinData(10)); // Fetch initial 10 coins
  }, [dispatch]);

  useEffect(() => {
    // Add event listener for scroll
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight && !loading) {
          dispatch(fetchCoinData(cryptoData.length + 10));
        }
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      const currentContainerRef = containerRef.current;
      if (currentContainerRef) {
        currentContainerRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [dispatch, cryptoData, loading]);

  if (loading && cryptoData.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul className="mt-4 overflow-y-auto" ref={containerRef} style={{ maxHeight: "calc(100vh - 100px)" }}>
      {cryptoData.map((crypto) => (
        <Link href="/[coinId]" as={`/${crypto.id}`} key={crypto.id}>
          <li key={crypto.id} className="container min-w-full my-1 h-16 flex items-center justify-start cursor-pointer">
            <span className="ml-6 w-10">{crypto.market_cap_rank}</span>
            <span className="w-48">
              <span className="w-36 flex items-center">
                <img className="w-7 mr-3" src={crypto.image} alt={"img"} />
                <span>{crypto.name}</span>
              </span>
            </span>
            <span className="w-36">${crypto.current_price.toLocaleString()}</span>
            <span className="w-28">{crypto.price_change_percentage_1h_in_currency.toFixed(1)}%</span>
            <span className="w-28">{crypto.price_change_percentage_24h_in_currency.toFixed(1)}%</span>
            <span className="w-32">{crypto.price_change_percentage_7d_in_currency.toFixed(1)}%</span>
            <span className="w-32">${crypto.market_cap}</span>
            <span className="w-40">${crypto.total_volume}</span>
            <div className="w-52">
              <div className="w-44">
                <div>
                  <span className="flex justify-between">
                    <span className="mr-2">{crypto.circulating_supply}</span>
                    <span className="ml-2">{crypto.total_supply}</span>
                  </span>
                </div>
              </div>
              <div className="h-4 w-44 bg-gray-50 bg-opacity-10 backdrop-blur-md rounded-lg overflow-hidden">
                <div
                  className="h-full bg-purple-500"
                  style={{
                    width: `${(parseFloat(crypto.circulating_supply) / parseFloat(crypto.total_supply)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <span className="flex justify-end w-36 mr-6">Coming Soon...</span>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default CoinList;
