"use client";
import Carousel from "./components/carousele";
import CoinList from "@/app/components/coinList";

const Home = () => {
  return (
    <div className="px-8">
      <Carousel />
      <div className="flex mt-12">
        <div className="container w-1/2 h-72 mr-4">
          <div className="text-center">Chart 1</div>
        </div>
        <div className="container w-1/2 h-72 ml-4">
          <div className="text-center">Chart 2</div>
        </div>
      </div>
      <div className="mt-12 flex justify-between">
        {" "}
        <span>#</span>
        <span className="ml-2 ">Name</span>
        <span className="ml-2">Price</span>
        <span className="ml-2">1h</span>
        <span className="ml-2">24h</span>
        <span className="ml-2">7d</span>
        <span className="ml-2">24h Vol/Market Cap</span>
        <span className="ml-2">Circulation/Total Supply</span>
        <span className="ml-2">7d Change</span>
      </div>
      <CoinList />
    </div>
  );
};

export default Home;
