import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setLoading(false);
    }
  };

  const toggleBlock = async (id, blocked) => {
    try {
      await axios.patch(`http://localhost:3000/users/${id}`, {
        blocked: !blocked,
      });
      fetchUsers();
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

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">👥 Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-3 font-medium text-gray-800">{user.name}</td>
                  <td className="p-3 text-gray-600">{user.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.blocked
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.blocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleBlock(user.id, user.blocked)}
                      className={`px-4 py-1 rounded-lg text-white text-sm font-semibold ${
                        user.blocked
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {user.blocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="p-6 text-center text-gray-500 italic"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
