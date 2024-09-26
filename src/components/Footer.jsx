import React from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: adds smooth scrolling
    });
  };

  return (
    <footer className="bg-indigo-600 text-white pt-10 pb-6 relative">
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Logo */}
        <Link
          to={"/"}
          onClick={scrollToTop}
          className="flex items-center justify-center space-x-4 text-lg font-bold "
        >
          QuickBGRemove
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-6 text-xs md:sm">
          <Link to="/about" onClick={scrollToTop} className="hover:underline">
            About Us
          </Link>
          <Link
            to="/privacy-policy"
            onClick={scrollToTop}
            className="hover:underline"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-service"
            onClick={scrollToTop}
            className="hover:underline"
          >
            Terms of Service
          </Link>
          <Link to="/contact" onClick={scrollToTop} className="hover:underline">
            Contact Us
          </Link>
        </nav>
      </div>

      {/* Social Links */}
      <div className="flex justify-center space-x-6 mt-6">
        <Link
          to="https://github.com/ZaryabAli-09"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-200"
        >
          <FaGithub size={20} />
        </Link>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs mt-4">
        © {new Date().getFullYear()} QuickBGRemove. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
