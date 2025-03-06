"use client";
import { navlinks } from "@/constant/constant";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import { TbAirBalloon } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface NavProps {
  setShowNav: (value: boolean) => void;
  isLoggedIn: boolean;
  userName: string | null;
}

const Nav: React.FC<NavProps> = ({ setShowNav, isLoggedIn, userName }) => {
  const [navBg, setNavBg] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setNavBg(window.scrollY >= 90);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className={`transition-all duration-200 h-[12vh] z-[1000] w-full flex items-center justify-center 
      ${navBg ? "bg-blue-950 shadow-md fixed" : "fixed"}`}>
      <div className="flex items-center justify-between w-[90%] xl:mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-18 h-18 bg-rose-500 rounded-full flex items-center justify-center">
            <TbAirBalloon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl text-white uppercase font-bold">Tripi</h1>
        </div>
        <div className="hidden lg:flex items-center space-x-10">
          {navlinks.map((link) => (
            <Link key={link.id} href={link.url}>
              <p className="relative text-white text-base font-radius w-fit block">{link.label}</p>
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link href="/profile">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <FaUserCircle className="text-white w-8 h-8" />
                  <span className="text-white text-base">{userName || "User"}</span>
                </div>
              </Link>
              <button onClick={handleLogout} className="px-8 py-2 text-black bg-white rounded-lg">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login">
              <button className="px-8 py-2 text-black bg-white rounded-lg">Login</button>
            </Link>
          )}
          <HiBars3BottomRight className="w-8 h-8 cursor-pointer text-white lg:hidden" onClick={() => setShowNav(true)} />
        </div>
      </div>
    </div>
  );
};

export default Nav;
