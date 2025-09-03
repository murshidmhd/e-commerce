import axios from "axios";
import React, { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Forgot Password Modal State
  const [showModal, setShowModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setError("⚠️ No user logged in");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:3000/users/${userId}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("❌ Failed to fetch user data");
        setLoading(false);
      });
  }, []);

  // Handle Forgot Password Submit
  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!resetEmail) {
      alert("Please enter your email");
      return;
    }

    // 🔥 Here you would call your backend API for password reset
    console.log("Password reset link sent to:", resetEmail);

    setShowModal(false);
    setResetEmail("");
    alert("📩 Password reset link sent to your email!");
  };

  if (loading) return <p className="text-center text-gray-600">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800">👤 Profile</h1>

        {/* Profile Info */}
        <div className="bg-gray-50 rounded-xl p-4 shadow-inner space-y-2">
          <p className="text-lg">
            <strong className="text-gray-700">Name:</strong> {user.name}
          </p>
          <p className="text-lg">
            <strong className="text-gray-700">Email:</strong> {user.email}
          </p>
        </div>

        {/* Settings Section */}
        <div className="border-t pt-4 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">⚙️ Settings</h2>

          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition font-medium"
          >
            Forgot Password
          </button>

          <button
            onClick={() => alert("Logout functionality here")}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600 transition font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-lg w-96 p-6">
            <h2 className="text-xl font-semibold mb-4">🔑 Reset Password</h2>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Send Reset Link
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
