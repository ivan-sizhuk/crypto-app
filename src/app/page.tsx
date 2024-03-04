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
      <CoinList />
    </div>
  );
};

export default Home;
