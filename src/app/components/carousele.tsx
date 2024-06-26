import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { fetchCoinData } from "../../lib/slices/coinListSlice";
import Link from "next/link";
import Image from "next/image";
import LoadingSpinner from "./loadingSpinner";

const Carousel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cryptoData, loading } = useAppSelector((state) => state.coinData);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchCoinData(10));
  }, [dispatch]);

  const handleNext = () => {
    if (currentIndex < cryptoData.length - 5) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative flex items-center">
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-purple-500 text-black rounded-full shadow-lg w-8 h-8 flex items-center justify-center opacity-50 hover:opacity-100 duration-300 p-2 z-10"
      >
        &lt;
      </button>
      <div className="grid grid-cols-5 gap-2 w-full">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="container min-w-[10rem] h-20 flex items-center justify-center p-2">
                <LoadingSpinner />
              </div>
            ))
          : cryptoData.slice(currentIndex, currentIndex + 5).map((crypto) => (
              <Link href="/[coinId]" as={`/${crypto.id}`} key={crypto.id}>
                <div className="container min-w-[10rem] h-20 flex items-center p-2">
                  <div className="relative w-10 h-10 mb-2">
                    <Image
                      src={typeof crypto.image === "string" ? crypto.image : crypto.image.large}
                      alt={crypto.name}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <div className="ml-2">
                    <span className="text-sm font-medium">{crypto.symbol}</span>
                    <span className="text-sm block">${crypto.current_price}</span>
                    <span
                      className={`text-sm ${
                        crypto.price_change_percentage_1h_in_currency > 0
                          ? "text-green-500 !important"
                          : "text-red-500 !important"
                      }`}
                    >
                      {crypto.price_change_percentage_1h_in_currency.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </Link>
            ))}
      </div>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-purple-500 text-black rounded-full shadow-lg w-8 h-8 flex items-center justify-center opacity-50 hover:opacity-100 duration-300 p-2 z-10"
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
