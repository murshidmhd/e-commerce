// PaymentPage.jsx
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

function PaymentPage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const { clearCart, cartItems } = useCart();

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
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${userId}`
      );
      const user = response.data;

      const newOrders = cartItems.map((item) => ({
        id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: item.title,
        author: item.author,
        type: item.type,
        price: item.price,
        condition: item.condition,
        imageUrl: item.imageUrl,
        quantity: item.quantity || 1,
        status: "Pending",
        date: new Date().toLocaleDateString(),
        paymentMethod,
      }));

      await axios.put(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        ...user,
        order: [...(user.order || []), ...newOrders],
        cart: [],
      });
      clearCart();
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch {
      toast.error("Something went wrong while placing order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
        <h1 className="text-xl font-bold mb-4">💳 Payment</h1>
        <div className="bg-gray-50 p-4 rounded mb-6">
          <h2 className="font-semibold mb-2">Order Summary</h2>
          {cartItems.map((item, i) => (
            <div key={i} className="flex justify-between mb-1">
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-2">Payment Method</h2>
          {["UPI", "Card", "Cash"].map((method) => (
            <label
              key={method}
              className="flex items-center mb-2 cursor-pointer"
            >
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
                className="mr-2"
              />
              {method}
            </label>
          ))}
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={cartItems.length === 0}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {cartItems.length === 0 ? "Cart Empty" : "Place Order"}
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
