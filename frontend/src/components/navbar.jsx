import React from 'react';

const Navbar = () => {
  return (
    <>
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 text-white">

      <div className="container mx-auto flex justify-between items-center py-5 px-6">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-white pl-0">Quantfit</h1>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-white hover:text-orange-500 relative">
            HOME
            {/* <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 block h-1 w-1 bg-orange-500 rounded-full"></span> */}
          </a>
        <a href="#" className="text-gray-300 hover:text-orange-500">ABOUT</a>
          <a href="#" className="text-gray-300 hover:text-orange-500">WORKOUTS</a>
        </nav>

        {/* Button */}
        <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
           Login/Signup
        </a>
      </div>
    </header>
    </>
  );
};

export default Navbar;