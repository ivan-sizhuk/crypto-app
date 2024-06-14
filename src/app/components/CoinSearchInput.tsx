"use client";
import React, { useState, useEffect } from "react";
import { useCoinSearch } from "../../lib/useCoinSearch";
import Image from "next/image";
import Link from "next/link";

const CoinSearchInput: React.FC = () => {
  const { searchTerm, setSearchTerm, searchResults, setSearchResults, cryptoData, error } = useCoinSearch();
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (cryptoData.length > 0) {
      setSearchResults(cryptoData.slice(0, 5));
    }
  }, [cryptoData, setSearchResults]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setSearchResults(cryptoData.slice(0, 5));
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 200);
    setSearchTerm("");
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full px-4 py-2 bg-gray-200 bg-opacity-10 backdrop-blur-md text-white rounded-md focus:outline-none transition duration-200 ease-in-out hover:bg-opacity-20"
      />
      {isFocused && searchResults.length > 0 && (
        <ul className="absolute mt-2 w-full bg-gray-600 bg-opacity-90 backdrop-blur-md rounded-md">
          {searchResults.map((coin) => (
            <li key={coin.id} className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-400 rounded-md">
              <Link href={`/${coin.id}`} className="flex items-center w-full h-full">
                <Image src={coin.large || coin.thumb || coin.image} alt={coin.name} width={32} height={32} />
                <span className="ml-2 text-black">{coin.symbol.toUpperCase()}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CoinSearchInput;
