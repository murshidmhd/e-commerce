import React, { useEffect, useState } from "react";
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import UserForm from "./UserForm";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editUser, setEditUser] = useState(null); // ✅ NEW: Edit user state

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ NEW: Delete user function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:3000/users/${id}`);
        alert("🗑️ User deleted successfully!");
        fetchUsers(); // Refresh the list
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("❌ Failed to delete user");
      }
    }
  };

  const toggleBlock = async (id, blocked) => {
    try {
      await axios.patch(`http://localhost:3000/users/${id}`, {
        blocked: !blocked,
      });
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, blocked: !blocked } : user
        )
      );
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 animate-pulse">Loading users...</p>
      </div>
    );

  const filteredUsers = users.filter((user) =>
    [user.name, user.email, user.role].some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-6">
      {/* Add User Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditUser(null); // ✅ NEW: Clear edit when toggling add form
          }}
          className={`font-bold py-2 px-4 rounded transition-colors duration-200 ${
            showAddForm
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-blue-500 hover:bg-blue-700 text-white"
          }`}
        >
          {showAddForm ? "Cancel" : "➕ Add User"}
        </button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editUser) && ( // ✅ NEW: Show form when adding OR editing
        <div className="mb-8 transition-all duration-500 ease-in-out transform scale-95 animate-fadeIn">
          <UserForm 
            setShowAddForm={setShowAddForm}
            fetchUsers={fetchUsers}  // ✅ NEW: Pass fetchUsers function
            editUser={editUser}      // ✅ NEW: Pass edit user data
            setEditUser={setEditUser} // ✅ NEW: Pass edit state setter
          />
        </div>
      )}

      {/* Search Bar */}
      <div className="flex items-center border rounded-lg px-3 py-2 w-full md:w-1/3 mb-6">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="outline-none w-full"
        />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">👥 Manage Users</h1>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-lg rounded-xl p-4 border border-gray-200 flex flex-col items-center"
            >
              <h3 className="font-semibold text-lg text-gray-900">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">Role: {user.role || "-"}</p>
              <span
                className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                  user.blocked
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {user.blocked ? "Blocked" : "Active"}
              </span>

              {/* ✅ NEW: Enhanced action buttons */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    setEditUser(user);      // ✅ NEW: Set user to edit
                    setShowAddForm(true);   // ✅ NEW: Show the form
                  }}
                  className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => toggleBlock(user.id, user.blocked)}
                  className={`px-3 py-2 text-sm rounded-lg text-white transition-colors ${
                    user.blocked
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
                >
                  {user.blocked ? "🔓 Unblock" : "🔒 Block"}
                </button>
                {/* ✅ NEW: Delete button */}
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 italic col-span-full">
            No users found matching your search
          </p>
        )}
      </div>
    </div>
  );
}

export default UserList;
