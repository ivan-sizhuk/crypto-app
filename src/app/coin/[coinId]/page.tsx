"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { fetchSelectedCoinData } from "../../../lib/slices/coinSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faCircle } from "@fortawesome/free-solid-svg-icons";
import { setSelectedCoinId } from "../../components/coinList";
import { setLoadingInitialized } from "../../../lib/slices/coinSlice";
import { CoinData } from "@/utilities/CoinDataInterface";

const Coin: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCoinId = useAppSelector((state) => state.selectedCoinId.selectedCoinId);
  const selectedCoinData: CoinData | null = useAppSelector((state) => state.selectedCoinData.selectedCoinData); // Explicitly define the type
  const loading = useAppSelector((state) => state.selectedCoinData.loading);
  const loadingInitialized = useAppSelector((state) => state.selectedCoinData.loadingInitialized);
  const error = useAppSelector((state) => state.selectedCoinData.error);

  useEffect(() => {
    const storedCoinId = localStorage.getItem("selectedCoinId");
    if (storedCoinId) {
      dispatch(setSelectedCoinId(storedCoinId));
    }
    dispatch(setLoadingInitialized(true)); // Set loadingInitialized flag
  }, [dispatch]);

  useEffect(() => {
    if (selectedCoinId && loadingInitialized) {
      dispatch(fetchSelectedCoinData(selectedCoinId) as any);
    }
  }, [dispatch, selectedCoinId, loadingInitialized]);

  if (loading || !selectedCoinData) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="px-8">
      <div className="flex h-72 gap-5">
        <div className="container flex flex-col justify-around w-3/5">
          <div className="flex justify-center items-center w-24 h-24">
            <img src={selectedCoinData.image.large} alt="" />
          </div>
          <p>{selectedCoinData.name}</p>
          <p>*link*</p>
        </div>
        <div className="container w-3/5 flex flex-col">
          <p className="text-3xl">${selectedCoinData.market_data.current_price.usd}</p>
          <p>......</p>
          <FontAwesomeIcon className="h-8 w-8" icon={faLayerGroup} />
          <div className="flex gap-14 px-8">
            <div>
              <p>ATH:</p>
              <p>...</p>
              <p>...</p>
              <p>...</p>
            </div>
            <div>
              <p>ATL:</p>
              <p>...</p>
              <p>...</p>
              <p>...</p>
            </div>
          </div>
        </div>
        <div className="container flex flex-col gap-2 px-8">
          <div>
            <FontAwesomeIcon className="text-purple-500" icon={faCircle} />
            Lorem ipsum dolor sit amet.
          </div>
          <div>
            <FontAwesomeIcon className="text-purple-500" icon={faCircle} />
            Lorem ipsum dolor sit amet.
          </div>
          <div>
            <FontAwesomeIcon className="text-purple-500" icon={faCircle} />
            Lorem ipsum dolor sit amet.
          </div>
          <div>
            <FontAwesomeIcon className="text-purple-500" icon={faCircle} />
            Lorem ipsum dolor sit amet.
          </div>
          <div>
            <FontAwesomeIcon className="text-purple-500" icon={faCircle} />
            Lorem ipsum dolor sit amet.
          </div>
          <div>
            <FontAwesomeIcon className="text-purple-500" icon={faCircle} />
            Lorem ipsum dolor sit amet.
          </div>
          <div>
            <FontAwesomeIcon className="text-purple-500" icon={faCircle} />
            Lorem ipsum dolor sit amet.
          </div>
        </div>
      </div>
      <div className="mt-8">
        <p>Description:</p>
        <div className="container flex min-w-full p-8">{selectedCoinData.description.en}</div>
      </div>
      <div>
        <div className="flex gap-5 mt-8">
          <div className="container h-16">hola</div>
          <div className="container h-16">hola</div>
        </div>
        <div className="container min-w-full h-16 mt-5">hola</div>
      </div>
    </div>
  );
};

export default Coin;
