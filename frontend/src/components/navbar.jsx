import React, { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 text-white">
      <div className="container mx-auto flex flex-wrap justify-between items-center py-5 px-6">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-white flex items-center">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            Quant
          </span>
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
            FIT
          </span>
        </h1>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation */}
        <nav
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-6`}
        >
          <Link
            to="/"
            className="text-white hover:text-orange-500"
            onClick={() => setIsOpen(false)}
          >
            HOME
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-orange-500"
            onClick={() => setIsOpen(false)}
          >
            ABOUT
          </Link>
          <Link
            to="/workout"
            className="text-white hover:text-orange-500"
            onClick={() => setIsOpen(false)}
          >
            WORKOUTS
          </Link>
          <Link
            to="/diet"
            className="text-white hover:text-orange-500"
            onClick={() => setIsOpen(false)}
          >
            DIET
          </Link>
          <Link
            to="/profile"
            className="text-white hover:text-orange-500"
            onClick={() => setIsOpen(false)}
          >
            PROFILE
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className={`${isOpen ? "block" : "hidden"} md:block mt-4 md:mt-0`}>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Navbar;