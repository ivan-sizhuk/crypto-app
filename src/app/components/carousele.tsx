const Carousel = () => {
  return (
    <div className="flex justify-between space-x-2">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="container w-32 h-20">
          Coin {index + 1}
        </div>
      ))}
    </div>
  );
};

export default Carousel;
