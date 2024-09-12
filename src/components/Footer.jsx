import React from "react";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white pt-10 pb-6 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Logo */}
        <Link to={"/"} className="flex items-center space-x-4">
          <span className="text-lg text-black font-bold">
            QuickBG<span className="text-indigo-300">Remove</span>{" "}
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-6 text-sm md:text-base">
          <a href="/about" className="hover:underline">
            About Us
          </a>
          <a href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="hover:underline">
            Terms of Service
          </a>
          <a href="/contact" className="hover:underline">
            Contact Us
          </a>
        </nav>
      </div>

      {/* Social Links */}
      <div className="flex justify-center space-x-6 mt-6">
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-200"
        >
          <FaLinkedinIn size={20} />
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-200"
        >
          <FaFacebookF size={20} />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-200"
        >
          <FaGithub size={20} />
        </a>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs mt-4">
        © {new Date().getFullYear()} QuickBGRemove. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
