import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:3000/users").then((res) => setUsers(res.data));
  };

  const toggleBlock = async (id, blocked) => {
    await axios.patch(`http://localhost:3000/users/${id}`, { blocked: !blocked });
    fetchUsers();
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Manage Users</h1>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="p-2">{u.id}</td>
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.blocked ? "Blocked" : "Active"}</td>
              <td className="p-2">
                <button 
                  onClick={() => toggleBlock(u.id, u.blocked)}
                  className={`px-2 py-1 rounded ${u.blocked ? "bg-green-500" : "bg-red-500"} text-white`}
                >
                  {u.blocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
