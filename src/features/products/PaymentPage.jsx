import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

function PaymentPage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const { clearCart, cartItems } = useCart();
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      const user = response.data;

      // Create orders with proper data
      const newOrders = cartItems.map((item) => ({
        id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: item.name,
        price: item.price,
        image: item.image,
        status: "Pending",
        date: new Date().toLocaleDateString(),
        paymentMethod: paymentMethod
      }));

      const updatedUser = {
        ...user,
        order: [...(user.order || []), ...newOrders],
        cart: [],
      };

      await axios.put(`http://localhost:3000/users/${userId}`, updatedUser);
      clearCart();
      
      toast.success("✅ Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Error placing order", err);
      toast.error("Something went wrong while placing order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">💳 Payment</h1>

        {/* Order Summary */}
        <div className="border rounded-lg p-4 mb-6 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Order Summary
          </h2>
          
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between text-gray-600 mb-2">
              <p className="truncate max-w-xs">{item.name}</p>
              <p>₹{item.price}</p>
            </div>
          ))}
          
          <div className="border-t pt-2 mt-3">
            <div className="flex justify-between text-gray-600 mb-1">
              <p>Subtotal</p>
              <p>₹{subtotal}</p>
            </div>
            <div className="flex justify-between text-gray-600 mb-1">
              <p>Shipping</p>
              <p>₹{shipping}</p>
            </div>
            <div className="flex justify-between font-bold text-gray-800 mt-2 pt-2 border-t">
              <p>Total</p>
              <p>₹{total}</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Choose Payment Method
          </h2>
          <div className="space-y-3">
            {["UPI", "Card", "Cash on Delivery"].map((method) => (
              <label
                key={method}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
                  paymentMethod === method
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                  className="mr-3"
                />
                {method}
              </label>
            ))}
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          disabled={cartItems.length === 0}
          className={`w-full py-3 rounded-lg transition font-medium ${
            cartItems.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {cartItems.length === 0 ? "Cart is Empty" : "Place Order"}
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;