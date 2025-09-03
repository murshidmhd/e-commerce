import axios from "axios";
import React, { useEffect, useState } from "react";

function ViewDetails() {
  // Example order data (later you can fetch this from your backend)
  const [order, setOrder] = useState({
    id: "ORD123456",
    product: {
      name: "The Great Gatsby",
      image: "https://m.media-amazon.com/images/I/81af+MCATTL.jpg",
      price: 499,
    },
    status: "Shipped", // Pending, Shipped, Out for Delivery, Delivered
    date: "2025-09-02",
  });

  useEffect(()=> {
    axios.get()
  })
  const handleCancelOrder = () => {
    if (order.status === "Pending" || order.status === "Shipped") {
      setOrder({ ...order, status: "Cancelled" });
      alert("❌ Your order has been cancelled.");
    } else {
      alert("⚠️ Order cannot be cancelled after it is out for delivery.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          📦 Order Details
        </h1>

        {/* Product Info */}
        <div className="flex items-center gap-6 border-b pb-4">
          <img
            src={order.product.image}
            alt={order.product.name}
            className="w-28 h-36 object-contain rounded-lg shadow"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {order.product.name}
            </h2>
            <p className="text-gray-500">₹{order.product.price}</p>
            <p className="text-sm text-gray-400">Order ID: {order.id}</p>
            <p className="text-sm text-gray-400">
              Ordered on: {order.date}
            </p>
          </div>
        </div>

        {/* Status Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Order Status
          </h3>

          <div className="flex items-center justify-between">
            {["Pending", "Shipped", "Out for Delivery", "Delivered"].map(
              (step, index) => (
                <div
                  key={index}
                  className={`flex-1 flex flex-col items-center relative ${
                    step === order.status ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 mb-2 ${
                      step === order.status
                        ? "bg-blue-500 text-white border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <p className="text-sm">{step}</p>
                  {index < 3 && (
                    <div
                      className={`absolute top-4 left-full w-full h-1 ${
                        step === order.status ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    ></div>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Cancel Order */}
        <div className="mt-8">
          {order.status !== "Cancelled" ? (
            <button
              onClick={handleCancelOrder}
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition font-medium"
            >
              Cancel Order
            </button>
          ) : (
            <p className="text-center text-red-600 font-semibold">
              ❌ This order has been cancelled
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;
