const Carousel = () => {
  return (
    <div className="flex justify-between space-x-2 mt-8">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="w-32 h-20 px-4 py-2 rounded-2xl cursor-pointer bg-indigo-950 hover:bg-indigo-900 transition duration-200 ease-in-out"
        >
          Coin {index + 1}
        </div>
      ))}
    </div>
  );
};

export default Carousel;
