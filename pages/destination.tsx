"use client";

import React from "react";

const Destination = () => {
  return (
    <div className="pt-[12vh] min-h-screen bg-gray-100 flex flex-col items-center px-4">
      <h1 className="text-3xl font-bold text-blue-600">Top Destinations</h1>
      <p className="text-lg mt-4 text-gray-700 w-[80%] text-center">
        Discover breathtaking places to visit around the world. Choose your dream destination and start your adventure today!
      </p>

      {/* Example Destination Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-[80%]">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-900">Paris, France</h2>
          <p className="text-gray-600">The city of love and lights.</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-900">Bali, Indonesia</h2>
          <p className="text-gray-600">A tropical paradise for beach lovers.</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-900">Tokyo, Japan</h2>
          <p className="text-gray-600">A blend of tradition and technology.</p>
        </div>
      </div>
    </div>
  );
};

export default Destination;
