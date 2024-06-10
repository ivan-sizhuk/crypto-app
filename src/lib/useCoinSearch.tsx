import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./hooks"; // Adjust the import path as needed
import { fetchCoinData } from "./slices/coinListSlice"; // Adjust the import path as needed
import { CoinData } from "../utilities/CoinDataInterface"; // Adjust the import path as needed

export const useCoinSearch = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<CoinData[]>([]);
  const { cryptoData, error } = useAppSelector((state) => state.coinData);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    dispatch(fetchCoinData());
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      searchTimeout.current = setTimeout(() => {
        fetchSearchResults(searchTerm.trim());
      }, 500);
    } else {
      setSearchResults(cryptoData.slice(0, 5));
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchTerm, cryptoData]);

  const fetchSearchResults = async (term: string) => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${term}`);
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      setSearchResults(data.coins.slice(0, 5));
    } catch (error) {
      console.error("Error searching coins:", error);
    }
  };

  return { searchTerm, setSearchTerm, searchResults, setSearchResults, cryptoData, error };
};
