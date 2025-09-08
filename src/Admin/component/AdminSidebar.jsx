import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="flex-1 p-4 space-y-4">
        <Link to="/admin/dashboard" className="block hover:text-yellow-400">
          Dashboard
        </Link>
        <Link to="/admin/products" className="block hover:text-yellow-400">
          Products
        </Link>
        <Link to="/admin/users" className="block hover:text-yellow-400">
          Users
        </Link>
        {/* <Link to="/admin/sales" className="block hover:text-yellow-400">
          Sales Data
        </Link> */}
      </nav>
    </div>
  );
}

export default AdminSidebar;
