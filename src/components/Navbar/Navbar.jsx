import React, { useState, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-300">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/" className="text-gray-800 ">
            FixandPolish
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/about-us" className="text-gray-800 hover:text-blue-500">
            About Us
          </Link>
          <div className="relative">
            <button
              onClick={() => setIsToolsMenuOpen(!isToolsMenuOpen)}
              className="text-gray-800 hover:text-blue-500 focus:outline-none"
            >
              Tools
            </button>
            <div
              className={`absolute top-10 -left-20  w-48 bg-white border border-gray-300 shadow-lg ${
                isToolsMenuOpen ? "block" : "hidden"
              }`}
            >
              <Link
                to="/tools/bg-remover"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                BG Remover
              </Link>
              <Link
                to="/tools/picture-enhance"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Picture Enhance
              </Link>
            </div>
          </div>
          <Link
            to="/signup"
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900 "
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
          className={`md:hidden fixed top-0 left-0 w-full h-full bg-white border-b border-gray-300 transition-transform ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } shadow-lg`}
        >
          <div className="flex flex-col p-4 space-y-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="self-end text-gray-800"
            >
              <FaTimes size={24} />
            </button>
            <Link to="/about-us" className=" hover:bg-gray-100 p-2 rounded">
              About Us
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsToolsMenuOpen(!isToolsMenuOpen)}
                className="w-full  hover:bg-gray-100 p-2 rounded text-left"
              >
                Tools
              </button>
              <div
                className={`flex flex-col mt-2 ${
                  isToolsMenuOpen ? "block" : "hidden"
                }`}
              >
                <Link
                  to="/tools/bg-remover"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  BG Remover
                </Link>
                <Link
                  to="/tools/picture-enhance"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Picture Enhance
                </Link>
              </div>
            </div>
            <Link
              to="/signup"
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900 "
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
