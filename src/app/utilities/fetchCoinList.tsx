"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface CoinDataProviderProps {
  children: ReactNode;
}

const CoinDataContext = createContext<any>(null);

export const CoinDataProvider = ({ children }: CoinDataProviderProps) => {
  const [cryptoData, setCryptoData] = useState<any[]>([]);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d"
    )
      .then((response) => response.json())
      .then((data) => setCryptoData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return <CoinDataContext.Provider value={cryptoData}>{children}</CoinDataContext.Provider>;
};

export const useCoinData = () => useContext(CoinDataContext);
