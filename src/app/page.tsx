"use client";
import Carousel from "./components/carousele";
import CoinList from "@/app/components/coinList";
import BitcoinPriceChart from "./components/bitcoinPriceChart";
import BitcoinVolumeChart from "./components/bitcoinVolumeChart";

const Home = () => {
  return (
    <div className="px-8">
      <Carousel />
      <div className="flex mt-12">
        <div className="container-no-hover flex items-center justify-center w-1/2 h-72 mr-4">
          <BitcoinPriceChart />
        </div>
        <div className="container-no-hover flex items-center justify-center w-1/2 h-72 ml-4 overflow-hidden">
          <BitcoinVolumeChart />
        </div>
      </div>
      <CoinList />
    </div>
  );
};

export default Home;
