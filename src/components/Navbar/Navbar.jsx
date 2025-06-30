import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef();
  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);
  return (
    <nav className="bg-white  border-gray-300 relative z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/" className="text-gray-800 ">
            <img loading="lazy" src={logo} width={150} className="" alt="" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center items-center space-x-4">
          <Link
            to="/"
            className="block px-4 py-2 text-gray-700 font-bold text-sm hover:text-indigo-800 hover:bg-gray-100"
          >
            BG Remover
          </Link>
          <Link
            to="/image-resizer"
            className="block px-4 py-2 text-gray-700  font-bold text-sm hover:text-indigo-800 hover:bg-gray-100"
          >
            Image Resizer
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 text-sm font-bold bg-indigo-600 text-white rounded hover:bg-indigo-800 "
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-800"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`md:hidden fixed top-0 left-0 w-[75%] h-full bg-white border-r border-gray-300 transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } shadow-lg z-50`}
        >
          <div className="text-xl font-bold px-4 py-2  ">
            <Link to="/" className="text-gray-800 ">
              <img loading="lazy" src={logo} width={150} className="" alt="" />
            </Link>
          </div>
          <div className="flex flex-col p-4 space-y-4">
            <div className="relative">
              <div className={`flex flex-col mt-2`}>
                <Link
                  to="/"
                  className="block px-4 py-2 hover:bg-gray-100  hover:text-indigo-800 text-sm font-bold text-gray-700 "
                >
                  BG Remover
                </Link>
                <Link
                  to="/image-resizer"
                  className="block px-4 py-2 text-gray-700  font-bold text-sm hover:text-indigo-800 hover:bg-gray-100"
                >
                  Image Resizer
                </Link>
              </div>
            </div>
            <Link
              to="/signup"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-800 "
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
