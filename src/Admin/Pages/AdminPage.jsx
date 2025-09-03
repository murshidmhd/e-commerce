import React, { useState } from "react";
import Dashboard from "../component/DashBoard";
import ProductList from "../component/ProductList";
import UserList from "../component/UserList";
import AdminSidebar from "../component/AdminSidebar";

function AdminPage() {
  const [section, setSection] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar setSection={setSection} />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {section === "dashboard" && <Dashboard />}
        {section === "products" && <ProductList />}
        {section === "users" && <UserList />}
      </div>
    </div>
  );
}

export default AdminPage;
