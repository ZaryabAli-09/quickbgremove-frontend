import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);

  return (
    <nav className="bg-white  border-gray-300 relative z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/" className="text-gray-800 ">
            <img src={logo} width={150} className="" alt="" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center items-center space-x-4">
          <Link
            to="/pricing"
            className="text-gray-700 text-sm  hover:text-indigo-800 font-bold"
          >
            Pricing
          </Link>
          <div className="relative">
            <button
              onClick={() => setIsToolsMenuOpen(!isToolsMenuOpen)}
              className="text-gray-700 text-sm  hover:text-indigo-800 focus:outline-none font-bold"
            >
              Tools
            </button>
            <div
              className={`absolute top-10 -left-20  w-48 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg ${
                isToolsMenuOpen ? "block" : "hidden"
              }`}
            >
              <Link
                to="/"
                className="block px-4 py-2 text-gray-700 font-bold text-sm hover:text-indigo-800 hover:bg-gray-100"
              >
                BG Remover
              </Link>
              <Link
                to="/document-scanner"
                className="block px-4 py-2 text-gray-700  font-bold text-sm hover:text-indigo-800 hover:bg-gray-100"
              >
                Document Scanner
              </Link>
              <Link
                to="/batch-processing"
                className="block px-4 py-2 text-gray-700  font-bold text-sm hover:text-indigo-800 hover:bg-gray-100"
              >
                Batch Processing
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

            <div className="relative">
              <button className="w-full   hover:bg-gray-100 p-2 rounded text-left font-bold">
                <Link
                  to="/pricing"
                  className="text-gray-700   hover:text-indigo-800 "
                >
                  Pricing
                </Link>
              </button>
              <button
                onClick={() => setIsToolsMenuOpen(!isToolsMenuOpen)}
                className="w-full   hover:bg-gray-100 p-2 rounded text-left font-bold"
              >
                Tools
              </button>
              <div
                className={`flex flex-col mt-2 ${
                  isToolsMenuOpen ? "block" : "hidden"
                }`}
              >
                <Link
                  to="/"
                  className="block px-4 py-2 hover:bg-gray-100  hover:text-indigo-800 text-sm font-bold text-gray-700 "
                >
                  BG Remover
                </Link>
                <Link
                  to="/document-scanner"
                  className="block px-4 py-2 hover:bg-gray-100  hover:text-indigo-800 text-sm font-bold text-gray-700 "
                >
                  Document Scanner
                </Link>
                <Link
                  to="/batch-processing"
                  className="block px-4 py-2 text-gray-700  font-bold text-sm hover:text-indigo-800 hover:bg-gray-100"
                >
                  Batch Processing
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
