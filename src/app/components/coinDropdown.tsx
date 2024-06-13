"use client";
import React, { useState, useEffect } from "react";
import { useCoinSearch } from "../../lib/useCoinSearch";
import Image from "next/image";

interface CoinDropdownProps {
  defaultCoin: { symbol: string; image: string };
}

const CoinDropdown: React.FC<CoinDropdownProps> = ({ defaultCoin }) => {
  const { searchTerm, setSearchTerm, searchResults, setSearchResults, cryptoData, error } = useCoinSearch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<{ symbol: string; image: string } | null>(defaultCoin);

  useEffect(() => {
    if (cryptoData.length > 0) {
      const defaultCoin = { symbol: "" };
      const defaultSelectedCoin = cryptoData.find((coin) => coin.symbol === defaultCoin.symbol);
      if (defaultSelectedCoin) {
        setSelectedCoin({
          symbol: defaultSelectedCoin.symbol,
          image: defaultSelectedCoin.image.large,
        });
      }
    }
  }, [cryptoData, defaultCoin]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Set the first 5 coins as the initial search results when opening the dropdown
      setSearchResults(cryptoData.slice(0, 5));
    }
  };

  const handleOptionClick = (symbol: string, image: string) => {
    setSelectedCoin({ symbol, image });
    setIsOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setSearchResults(cryptoData.slice(0, 5));
    }
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="flex items-center w-32">
        {selectedCoin ? (
          <>
            <Image src={selectedCoin.image} alt={selectedCoin.symbol} width={32} height={32} />
            <span className="ml-2">{selectedCoin.symbol.toUpperCase()}</span>
          </>
        ) : (
          "Loading..."
        )}
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-44 text-black">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-md px-3 py-1 w-full"
          />
          <ul className="mt-2 bg-white border border-gray-300 rounded-md shadow-sm">
            {searchResults.map((coin) => (
              <li
                key={coin.id}
                onClick={() => handleOptionClick(coin.symbol, coin.large || coin.image || coin.thumb)}
                className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-100"
              >
                <Image src={coin.large || coin.image || coin.thumb} alt={coin.name} width={32} height={32} />
                <span className="ml-2">{coin.symbol.toUpperCase()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CoinDropdown;
