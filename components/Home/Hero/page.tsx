// components/Hero.tsx
"use client"; // Ensure it's a client-side component

import React, { useEffect, useState } from "react";
import SearchBox from "@/components/Helper/SearchBox";
import { decodeToken } from "../../../utils/decodeToken"; // Adjust this import path if needed

const Hero = () => {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token) as { name: string };
      if (decoded && decoded.name) {
        setUserName(decoded.name);
      }
    }
  }, []);

  return (
    <div className="relative w-full h-[120vh] sm:h-[100vh]">
      {/* Video Background */}
      <video
        src="/images/hero1.mp4"
        autoPlay
        muted
        loop
        preload="metadata"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-70"></div>

      {/* Content */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center space-y-8">
        {/* Text Content */}
        <div className="text-center">
          <h1 className="text-[25px] mb-4 md:mb-8 md:text-[35px] lg:text-[45px] tracking-[0.7rem] text-white font-bold uppercase">
            {userName ? `Welcome, ${userName}` : "Let’s Enjoy The Nature"}
          </h1>
          <p className="md:text-base text-lg text-white font-normal [word-spacing:5px]">
            Get the best prices on 2,000,000+ properties, worldwide
          </p>
        </div>

        {/* SearchBox */}
        <SearchBox />
      </div>
    </div>
  );
};

export default Hero;
