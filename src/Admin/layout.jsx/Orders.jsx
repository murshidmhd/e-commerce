import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        const allOrders = res.data.flatMap((user) =>
          (user.order || []).map((o) => ({
            ...o,
            userId: user.id,
            name: user.name,
            userEmail: user.email,
            status: o.status || "Pending",
          }))
        );

        setOrders(allOrders);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error fetching orders!");
        setLoading(false);
      });
  };

  const handleStatus = async (e, order) => {
    const newStatus = e.target.value;
    // console.log(order);

    try {
      const userRes = await axios.get(
        `http://localhost:3000/users/${order.userId}`
      );

      console.log(order.userId);
      console.log(order);
      console.log(userRes)

      const user = userRes.data;
      user.order = user.order.map((o) =>
        o.id === order.id ? { ...o, status: newStatus } : o
      );

      await axios.put(`http://localhost:3000/users/${order.userId}`, user);

      fetchOrders();
    } catch {
      toast.error("Error updating status!");
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">All Orders</h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="text-left p-2">User</th>
            <th className="text-left p-2">Book</th>
            <th className="text-left p-2">Price</th>
            <th className="text-left p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-200">
              <td className="p-2">{order.name}</td>
              <td className="p-2">{order.title}</td>
              <td className="p-2">₹{order.price}</td>
              <td className="p-2">
                <select
                  value={order.status}
                  onChange={(e) => handleStatus(e, order)}
                  className="border rounded p-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersPage;
