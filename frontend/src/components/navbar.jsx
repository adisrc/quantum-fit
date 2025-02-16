import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 text-white">
        <div className="container mx-auto flex justify-between items-center py-5 px-6">
          {/* Logo */}
          <h1 className="text-3xl font-bold text-white pl-0">Quantfit</h1>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-orange-500">
              HOME
            </Link>
            <Link to="/about" className="text-white hover:text-orange-500">
              ABOUT
            </Link>
            <Link to="/workout" className="text-white hover:text-orange-500">
              WORKOUTS
            </Link>
          </nav>

          {/* Button */}
          <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {/* <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
           Login/Signup
        </a> */}
        </div>
      </header>
    </>
  );
};

export default Navbar;