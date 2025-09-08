import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/users");
    setUsers(res.data);
  };

  const toggleBlock = async (id, blocked) => {
    await axios.patch(`http://localhost:3000/users/${id}`, {
      blocked: !blocked,
    });
    fetchUsers();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Users</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-lg rounded-xl p-4 border border-gray-200 flex flex-col items-center"
          >
            <h3 className="font-semibold text-lg text-gray-900">{user.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{user.email}</p>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                user.blocked
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {user.blocked ? "Blocked" : "Active"}
            </span>

            <button
              onClick={() => toggleBlock(user.id, user.blocked)}
              className={`mt-4 px-4 py-2 rounded-lg text-white text-sm ${
                user.blocked
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {user.blocked ? "Unblock" : "Block"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
