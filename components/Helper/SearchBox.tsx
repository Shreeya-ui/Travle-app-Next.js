"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-solid-svg-icons";
import { FaCalendar, FaUserGroup } from "react-icons/fa6";

const SearchBox = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSearch = () => {
    if (!isLoggedIn) {
      alert("Please log in to search for destinations.");
      router.push("/login");
      return;
    }

    if (!location || !startDate || !endDate || !travelers) {
      alert("Please fill in all fields.");
      return;
    }

    router.push(
      `/search?location=${location}&startDate=${startDate}&endDate=${endDate}&travelers=${travelers}`
    );
  };

  return (
    <div className="bg-white rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-8 mt-4 sm:mt-12 w-[95%] sm:w-[80%] mx-auto">
      {/* Location Input */}
      <div className="flex items-center space-x-2">
        <FontAwesomeIcon icon={faMap} className="w-6 h-6 text-blue-500" />
        <div>
          <p className="text-lg font-semibold mb-1">Location</p>
          <input
            type="text"
            placeholder="Where are you going?"
            className="w-full outline-none border-none placeholder:text-gray-900"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      {/* Start Date Input */}
      <div className="flex items-center space-x-2">
        <FaCalendar className="w-6 h-6 text-blue-500" />
        <div>
          <p className="text-lg font-semibold mb-1">Start Date</p>
          <input
            type="date"
            className="w-full outline-none border-none"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
      </div>

      {/* End Date Input */}
      <div className="flex items-center space-x-2">
        <FaCalendar className="w-6 h-6 text-blue-500" />
        <div>
          <p className="text-lg font-semibold mb-1">End Date</p>
          <input
            type="date"
            className="w-full outline-none border-none"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Number of Travelers */}
      <div className="flex items-center space-x-2">
        <FaUserGroup className="w-6 h-6 text-blue-500" />
        <div>
          <p className="text-lg font-semibold mb-1">Travelers</p>
          <input
            type="number"
            placeholder="No. of travelers"
            className="w-full outline-none border-none placeholder:text-gray-900"
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
          />
        </div>
      </div>

      {/* Search Button Centered */}
      <div className="flex justify-center col-span-full">
        <button
          onClick={handleSearch}
          className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
