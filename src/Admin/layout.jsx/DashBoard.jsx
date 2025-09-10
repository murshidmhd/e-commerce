import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#845EC2",
  "#FF6F91",
];

// ... keep your imports same

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get("http://localhost:3000/users");
        const listingsRes = await axios.get("http://localhost:3000/listings");

        setUsers(usersRes.data);
        setListings(listingsRes.data);

        // Collect all orders
        const allOrders = usersRes.data.flatMap((u) =>
          (u.order || []).map((o) => ({
            ...o,
            customer: u.name || "Unknown",
            date: o.date || new Date().toISOString(), // fallback if no date
          }))
        );

        // Group sales by book title
        const salesMap = {};
        allOrders.forEach((order) => {
          if (!salesMap[order.title]) {
            salesMap[order.title] = {
              title: order.title,
              sales: 0,
              revenue: 0,
            };
          }
          salesMap[order.title].sales += order.quantity;
          salesMap[order.title].revenue += order.price * order.quantity;
        });
        setSalesData(Object.values(salesMap));

        // Group products by type
        const typeMap = {};
        listingsRes.data.forEach((item) => {
          if (!typeMap[item.type]) {
            typeMap[item.type] = { name: item.type, value: 0 };
          }
          typeMap[item.type].value += 1;
        });
        setCategoryData(Object.values(typeMap));

        // Sort orders by date (latest first) and take top 5
        const sortedOrders = allOrders
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);
        setRecentOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  // Totals
  const totalUsers = users.length;
  const totalProducts = listings.length;
  const totalSales = salesData.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Products</h2>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Total Sales</h2>
          <p className="text-2xl font-bold">₹{totalSales}</p>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Line Chart */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Sales Performance</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                name="Sales"
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#82ca9d"
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Products by Category</h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60}
                fill="#8884d8"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">🛒 Recent Orders</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="p-2">Customer</th>
              <th className="p-2">Product</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Price</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.length > 0 ? (
              recentOrders.map((order, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-2">{order.customer}</td>
                  <td className="p-2">{order.title}</td>
                  <td className="p-2">{order.quantity}</td>
                  <td className="p-2">₹{order.price * order.quantity}</td>
                  <td className="p-2">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No recent orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
