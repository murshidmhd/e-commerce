import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-cyan-600">
          TheBook
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6 hidden md:flex">
          <Link
            to="/"
            className="text-gray-700 hover:text-cyan-500 font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="text-gray-700 hover:text-cyan-500 font-medium transition"
          >
            Shop
          </Link>
           <Link
            to="/Donate"
            className="text-gray-700 hover:text-cyan-500 font-medium transition"
          >
            Donate
          </Link>
          <Link
            to="/cart"
            className="text-gray-700 hover:text-cyan-500 font-medium transition"
          >
            Cart
          </Link>
          <Link
            to="/login"
            className="text-gray-700 hover:text-cyan-500 font-medium transition"
          >
            Login
          </Link>
          {/* <Link
            to="/register"
            className="text-gray-700 hover:text-cyan-500 font-medium transition"
          >
            Register
          </Link> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
