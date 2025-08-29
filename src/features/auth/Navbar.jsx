import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HeartIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../cart-wish/CartContext";
import { useWishlist } from "../cart-wish/WishListContext";

function Navbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navigate = useNavigate();

  const { cartItems, setCartItems } = useCart();
  const { wishlist, setWishlist } = useWishlist();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    setCartItems([]);
    setWishlist([]);
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-2 rounded-lg">
                <span className="text-white font-bold text-xl">TB</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                TheBook
              </span>
            </Link>

            {/* Links */}
            <div className="hidden md:flex space-x-10 font-medium">
              <Link
                to="/"
                className="text-gray-700 hover:text-cyan-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-gray-700 hover:text-cyan-600 transition-colors"
              >
                Shop
              </Link>
              <Link
                to="/order"
                className="text-gray-700 hover:text-cyan-600 transition-colors"
              >
                Orders
              </Link>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-5">
              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative text-gray-600 hover:text-cyan-600"
              >
                <HeartIcon className="w-6 h-6" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative text-gray-600 hover:text-cyan-600"
              >
                <ShoppingCartIcon className="w-6 h-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {/* Login / Logout */}
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition"
                >
                  <UserCircleIcon className="w-5 h-5" />
                  <span>Login</span>
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  <UserCircleIcon className="w-5 h-5 text-gray-700" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}

export default Navbar;
