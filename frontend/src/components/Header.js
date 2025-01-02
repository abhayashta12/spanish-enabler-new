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

  // Close menu on link click
  const handleLinkClick = () => {
    setMenuOpen(false);
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
        <ul
          className={`fixed md:static md:flex top-0 left-0 w-full md:w-auto bg-white h-screen md:h-auto md:bg-transparent z-40 flex-col md:flex-row items-center justify-center md:space-x-4 shadow-lg md:shadow-none transition-all duration-300 ease-in-out ${
            menuOpen ? 'flex' : 'hidden'
          } md:block`}
        >
          <li className="py-4 md:py-0">
            <a
              href="#about"
              className="block px-4 py-2 text-center text-lg hover:text-black hover:font-bold hover:bg-yellow-100 transition duration-300 ease-in-out"
              onClick={handleLinkClick}
            >
              About
            </a>
          </li>
          <li className="py-4 md:py-0">
            <a
              href="#courses"
              className="block px-4 py-2 text-center text-lg hover:text-black hover:font-bold hover:bg-yellow-100 transition duration-300 ease-in-out"
              onClick={handleLinkClick}
            >
              Courses
            </a>
          </li>
          <li className="py-4 md:py-0">
            <a
              href="#testimonials"
              className="block px-4 py-2 text-center text-lg hover:text-black hover:font-bold hover:bg-yellow-100 transition duration-300 ease-in-out"
              onClick={handleLinkClick}
            >
              Testimonials
            </a>
          </li>
          <li className="py-4 md:py-0">
            <a
              href="#contact"
              className="block px-4 py-2 text-center text-lg hover:text-black hover:font-bold hover:bg-yellow-100 transition duration-300 ease-in-out"
              onClick={handleLinkClick}
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black focus:outline-none bg-gray-200 rounded-md p-2 z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>
      </nav>
    </header>
  );
};

export default Header;
