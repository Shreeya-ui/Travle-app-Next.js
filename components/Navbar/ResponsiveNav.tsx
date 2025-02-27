"use client";
import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { auth } from '../lib/firebaseConfig'; // Assuming Firebase auth is set up

const ResponsiveNav = () => {
  const [showNav, setShowNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserName(user.displayName); // Save user display name
      } else {
        setIsLoggedIn(false);
        setUserName(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {/* Pass login state and username to Nav */}
      <Nav setShowNav={setShowNav} isLoggedIn={isLoggedIn} userName={userName} />
      {/* Show MobileNav only when needed */}
      <MobileNav isOpen={showNav} onClose={() => setShowNav(false)} />
    </div>
  );
};

export default ResponsiveNav;
