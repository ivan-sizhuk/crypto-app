import Carousel from "@/components/carousel";

export default function Home() {
  return (
    <div className="px-14">
      <Carousel />
      <div className="flex mt-12">
        <div className="w-1/2 h-72 mr-4 bg-indigo-950 hover:bg-indigo-900 transition duration-200 ease-in-out flex items-center justify-center rounded-2xl cursor-pointer">
          <div className="text-center">Chart 1</div>
        </div>
        <div className="w-1/2 h-72 ml-4 bg-indigo-950 hover:bg-indigo-900 transition duration-200 ease-in-out flex items-center justify-center rounded-2xl cursor-pointer">
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
      <div className="mt-4">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="my-1 h-16 bg-indigo-950 hover:bg-indigo-900 transition duration-200 ease-in-out text-white flex items-center justify-between rounded-xl cursor-pointer"
          >
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
        ))}
      </div>
    </div>
  );
}
