"use client";
import { navlinks } from "@/constant/constant";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("jwtToken"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    onClose();
  };

  return (
    <div
      className={`fixed ${isOpen ? "translate-x-0" : "translate-x-[-100%]"} inset-0 z-[1000] transition-all duration-500 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-70 w-full h-screen" onClick={onClose}></div>
      <div className="text-white fixed top-0 left-0 h-full w-[80%] sm:w-[60%] bg-rose-500 flex flex-col transform transition-transform duration-500 delay-300 z-[10000]">
        <CgClose className="absolute top-4 right-6 sm:w-8 sm:h-8 w-6 h-6 cursor-pointer" onClick={onClose} />
        <div className="mt-16 flex flex-col space-y-6">
          {navlinks.map((link) => (
            <Link key={link.id} href={link.url}>
              <p onClick={onClose} className="text-white text-lg ml-12 border-b border-white pb-1 sm:text-xl">
                {link.label}
              </p>
            </Link>
          ))}
        </div>
        {isLoggedIn && (
          <div className="mt-4">
            <button onClick={handleLogout} className="w-full py-3 bg-red-600 text-white text-lg rounded-lg">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
