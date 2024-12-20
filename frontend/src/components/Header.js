// src/components/Header.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../assets/spanish.png';
 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll to top function
  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white text-black shadow-lg">
      <nav className="container mx-auto flex justify-between items-center p-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" onClick={handleLogoClick}>
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 mr-2 cursor-pointer"
            />
          </Link>
        </div>
        {/* Navigation Links */}
        <ul className={`md:flex space-x-4 ${menuOpen ? 'block' : 'hidden'} md:block`}>
  <li><a href="#about" className="hover:text-black hover:font-bold hover:bg-yellow-100 transition duration-300 ease-in-out">About</a></li>
  <li><a href="#courses" className="hover:text-black hover:font-bold hover:bg-yellow-100 transition duration-300 ease-in-out">Courses</a></li>
  <li><a href="#testimonials" className="hover:text-black hover:font-bold hover:bg-yellow-100 transition duration-300 ease-in-out">Testimonials</a></li>
  <li><a href="#contact" className="hover:text-black hover:font-bold hover:bg-yellow-100 transition duration-300 ease-in-out">Contact</a></li>
</ul>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </nav>
    </header>
  );
};

export default Header;
