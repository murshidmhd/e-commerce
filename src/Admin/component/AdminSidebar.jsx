import React from "react";

function AdminSidebar({ setSection }) {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="flex-1 p-4 space-y-4">
        <button onClick={() => setSection("dashboard")} className="block w-full text-left hover:text-yellow-400">Dashboard</button>
        <button onClick={() => setSection("products")} className="block w-full text-left hover:text-yellow-400">Products</button>
        <button onClick={() => setSection("users")} className="block w-full text-left hover:text-yellow-400">Users</button>
        <button onClick={() => setSection("sales")} className="block w-full text-left hover:text-yellow-400">Sales Data</button>
      </nav>
    </div>
  );
}

export default AdminSidebar;
