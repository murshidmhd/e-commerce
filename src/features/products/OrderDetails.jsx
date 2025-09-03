import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

function OrderDetails() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();


  const handlePlaceOrder = async () => {
    navigate("/paymentpage")
  };
  useState();
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-6">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Order Details
        </h1>

        {/* Order Summary */}
        <div className="border rounded-xl p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Items in your order
          </h2>
          <div className="flex justify-between border-b pb-2 mb-2">
            <span>Product 1</span>
            <span>₹499</span>
          </div>
          <div className="flex justify-between border-b pb-2 mb-2">
            <span>Product 2</span>
            <span>₹799</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹1,298</span>
          </div>
        </div>

        {/* Address Box */}
        <div className="border rounded-xl p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Shipping Address
          </h2>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Full Address"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
            <input
              type="text"
              placeholder="City"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Pincode"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </form>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-3">
          <button className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded-xl">
            Cancel
          </button>
          <button
            className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
