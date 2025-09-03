import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

function PaymentPage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const { clearCart, cartItems } = useCart();

  const handlePlaceOrder = async () => {
    const userId = localStorage.getItem("userId");

    try {
      const res = await axios.get(`http://localhost:3000/users/${userId}`);
      const user = res.data;

      const updateUser = {
        ...user,
        order: [...user.order, ...cartItems],
        cart: [],
      };

      await axios.put(`http://localhost:3000/users/${userId}`, updateUser);

      clearCart();

      navigate("/");

      toast.success("✅ Order placed successfully!");
    } catch (err) {
      console.error("Erro placing order", err);
      alert("Something went wrong while placing order");
    }

    // 👉 Here you will call your placeOrder() logic
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">💳 Payment</h1>

        {/* Order Summary */}
        <div className="border rounded-lg p-4 mb-6 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Order Summary
          </h2>
          <div className="flex justify-between text-gray-600 mb-1">
            <p>
              Book: <span className="font-medium">The Great Gatsby</span>
            </p>
            <p>₹499</p>
          </div>
          <div className="flex justify-between text-gray-600 mb-1">
            <p>Shipping</p>
            <p>₹50</p>
          </div>
          <div className="flex justify-between font-bold text-gray-800 mt-2">
            <p>Total</p>
            <p>₹549</p>
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
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
