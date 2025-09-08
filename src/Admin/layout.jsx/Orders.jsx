import React, { useEffect, useState } from "react";
import axios from "axios";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        const allOrders = res.data.flatMap((user) =>
          user.order.map((o) => ({
            ...o,
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
          }))
        );
        setOrders(allOrders);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 animate-pulse">Loading orders...</p>
      </div>
    );

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">📦 All Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Book</th>
              <th className="p-3">Price</th>
              <th className="p-3">Condition</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-3 font-medium text-gray-800">
                    {order.userName}
                  </td>
                  <td className="p-3 text-gray-600">{order.userEmail}</td>
                  <td className="p-3">{order.title}</td>
                  <td className="p-3 font-semibold text-green-600">
                    ₹{order.price}
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.condition === "New"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.condition}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="p-6 text-center text-gray-500 italic"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersPage;
