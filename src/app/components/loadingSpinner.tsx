import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500"></div>
    </div>
  );
};

export default LoadingSpinner;
