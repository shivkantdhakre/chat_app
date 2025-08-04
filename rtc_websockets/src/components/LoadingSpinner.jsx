import React from "react";

const LoadingSpinner = ({ size = "lg", text = "Loading..." }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`spinner ${sizeClasses[size]} mb-4 animate-glow`}></div>
      {text && (
        <p className="text-gray-600 font-medium animate-pulse-slow">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
