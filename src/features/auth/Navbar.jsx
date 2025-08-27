import React from "react";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

function Navbar() {
  // Sample cart count, replace with real state later
  const cartCount = 3;

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-cyan-600">
          TheBook
        </Link>

        {/* Center navigation */}
        <div className="hidden md:flex space-x-12 font-semibold text-gray-700">
          <Link to="/" className="hover:text-cyan-600 transition duration-200">
            Home
          </Link>
          <Link
            to="/shop"
            className="hover:text-cyan-600 transition duration-200"
          >
            Shop
          </Link>
          <Link
            to="/donate"
            className="hover:text-cyan-600 transition duration-200"
          >
            Donate
          </Link>
        </div>

        {/* Right icons group */}
        <div className="flex items-center space-x-6">
          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative text-gray-700 hover:text-cyan-600 transition duration-200"
          >
            <HeartIcon className="w-7 h-7" />
            {/* Add badge if needed */}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-cyan-600 transition duration-200"
          >
            <ShoppingCartIcon className="w-7 h-7" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 font-semibold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Login */}
          <Link
            to="/login"
            className="text-gray-700 hover:text-cyan-600 transition duration-200 flex items-center space-x-1"
          >
            <UserCircleIcon className="w-7 h-7" />
            <span className="hidden md:inline font-medium">Login</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
