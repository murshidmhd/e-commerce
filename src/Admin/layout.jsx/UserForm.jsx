import axios from "axios";
import { useState, useEffect } from "react";

function UserForm({ setShowAddForm, fetchUsers, editUser, setEditUser }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  // ✅ NEW: useEffect to populate form when editing
  useEffect(() => {
    if (editUser) {
      setFormData({
        name: editUser.name || "",
        email: editUser.email || "",
        role: editUser.role || "",
        password: "", // Don't pre-fill password for security
      });
    }
  }, [editUser]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ NEW: Check if we're editing or creating
      if (editUser) {
        // Update existing user
        await axios.put(`http://localhost:3000/users/${editUser.id}`, formData);
        alert("✅ User updated successfully!");
        setEditUser(null); // ✅ NEW: Clear edit state
      } else {
        // Create new user
        await axios.post("http://localhost:3000/users", formData);
        alert("✅ User added successfully!");
      }
      
      setShowAddForm(false);
      setFormData({ name: "", email: "", role: "", password: "" });
      fetchUsers(); // ✅ NEW: Refresh the user list
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      {/* ✅ NEW: Dynamic title based on mode */}
      <h2 className="text-xl font-semibold mb-4">
        {editUser ? "Update User" : "Add New User"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Moderator">Moderator</option>
        </select>
        <input
          type="password"
          name="password"
          placeholder={editUser ? "New Password (leave blank to keep current)" : "Password"}
          value={formData.password}
          onChange={handleChange}
          className="border p-2 rounded"
          required={!editUser} // ✅ NEW: Password only required for new users
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          {editUser ? "Update" : "Save"} {/* ✅ NEW: Dynamic button text */}
        </button>
        <button
          type="button"
          onClick={() => {
            setShowAddForm(false);
            setEditUser && setEditUser(null); // ✅ NEW: Clear edit state on cancel
          }}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
        {/* ✅ NEW: Cancel Edit button when editing */}
        {editUser && (
          <button
            type="button"
            onClick={() => setEditUser(null)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
}

export default UserForm;
