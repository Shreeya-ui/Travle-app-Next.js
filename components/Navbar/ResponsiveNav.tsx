"use client";
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const ResponsiveNav = () => {
  const [showNav, setShowNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("jwtToken"));
    setUserName(localStorage.getItem("userName") || null);
  }, []);

  return (
    <div>
      <Nav setShowNav={setShowNav} isLoggedIn={isLoggedIn} userName={userName} />
      <MobileNav isOpen={showNav} onClose={() => setShowNav(false)} />
    </div>
  );
};

export default ResponsiveNav;
