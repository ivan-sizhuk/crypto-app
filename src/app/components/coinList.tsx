import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { fetchCoinData } from "../../lib/slices/coinListSlice";
import SevenDayChart from "./sevenDayChart";
import Link from "next/link";
import Image from "next/image";
import LoadingSpinner from "./loadingSpinner";

const CoinList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cryptoData, loading, error } = useAppSelector((state) => state.coinData);
  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    dispatch(fetchCoinData(10));
  }, [dispatch]);

  useEffect(() => {
    const currentContainerRef = containerRef.current;

    const handleScroll = () => {
      if (currentContainerRef) {
        const { scrollTop, clientHeight, scrollHeight } = currentContainerRef;
        if (scrollTop + clientHeight >= scrollHeight && !loading) {
          dispatch(fetchCoinData(cryptoData.length + 10));
        }
      }
    };

    if (currentContainerRef) {
      currentContainerRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentContainerRef) {
        currentContainerRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [dispatch, cryptoData, loading]);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <button
        onClick={scrollToTop}
        className="z-10 fixed bottom-4 right-20 p-2 bg-purple-500 text-black text-xl rounded-full shadow-lg w-12 h-12 flex items-center justify-center opacity-50 hover:opacity-100 duration-300"
      >
        ^
      </button>
      <ul className="mt-4 overflow-y-auto relative" ref={containerRef} style={{ maxHeight: "calc(100vh - 100px)" }}>
        <li className="z-10 cursor-default text-gray-900 bg-gray-600 container-no-hover min-w-full my-1 sticky top-0">
          <span className="ml-6 w-10">#</span>
          <span className="w-48">Name</span>
          <span className="w-36">Price</span>
          <span className="w-28">1h%</span>
          <span className="w-28">24h%</span>
          <span className="w-32">7d%</span>
          <span className="w-32">Market Cap</span>
          <span className="w-40">Volume(24h)</span>
          <span className="w-52">Circulating Supply</span>
          <span className="w-36">Last 7d</span>
        </li>
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <li key={index} className="container min-w-full my-1 h-16 flex items-center justify-center">
                <LoadingSpinner />
              </li>
            ))
          : cryptoData.map((crypto) => (
              <Link href="/[coinId]" as={`/${crypto.id}`} key={crypto.id}>
                <li className="container min-w-full my-1 h-16">
                  <span className="ml-6 w-10">{crypto.market_cap_rank}</span>
                  <span className="w-48">
                    <span className="w-36 flex items-center">
                      <div className="relative w-7 h-7 mr-2">
                        <Image
                          src={typeof crypto.image === "string" ? crypto.image : crypto.image.large}
                          alt={crypto.name}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                      <span className="mr-2">{crypto.name}</span>
                      <span>{crypto.symbol}</span>
                    </span>
                  </span>
                  <span className="w-36">${crypto.current_price.toLocaleString()}</span>
                  <span
                    className={`w-28 ${
                      crypto.price_change_percentage_1h_in_currency > 0
                        ? "text-green-500 !important"
                        : "text-red-500 !important"
                    }`}
                  >
                    {crypto.price_change_percentage_1h_in_currency.toFixed(1)}%
                  </span>
                  <span
                    className={`w-28 ${
                      crypto.price_change_percentage_24h_in_currency > 0
                        ? "text-green-500 !important"
                        : "text-red-500 !important"
                    }`}
                  >
                    {crypto.price_change_percentage_24h_in_currency.toFixed(1)}%
                  </span>
                  <span
                    className={`w-32 ${
                      crypto.price_change_percentage_7d_in_currency > 0
                        ? "text-green-500 !important"
                        : "text-red-500 !important"
                    }`}
                  >
                    {crypto.price_change_percentage_7d_in_currency.toFixed(1)}%
                  </span>
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
                  <div className="flex justify-end items-center w-36 h-1 mr-6">
                    <SevenDayChart data={crypto.sparkline_in_7d.price} />
                  </div>
                </li>
              </Link>
            ))}
      </ul>
    </div>
  );
};

export default CoinList;
