import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCoinData } from "../lib/slices/coinDataSlice";

interface CoinDataProviderProps {
  children: React.ReactNode;
}

const CoinDataProvider: React.FC<CoinDataProviderProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoinData());
  }, [dispatch]);

  return <>{children}</>;
};

export default CoinDataProvider;
