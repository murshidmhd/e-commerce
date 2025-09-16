import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const cart = [];
  const wishlist = [];
  const order = [];
  // const role

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    try {
      const newUser = {
        name,
        email,
        password,
        role: "user",
        cart,
        wishlist,
        order,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        newUser
      );
      console.log("user registered", response.data);
      alert("registered");
      navigate("/login");
    } catch (e) {
      setError("Registration failed");
      console.log(e);
    }
  };

  const handleGoogleLogin = () => {
    // google click working function
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div
        className="relative"
        style={{ minWidth: "320px", minHeight: "430px" }}
      >
        {/* ithan blue card */}
        <div className="absolute inset-0 w-80 h-100 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl transform rotate-6 translate-x-1 translate-y-0 " />

        <div className="relative w-80 h-100 bg-white p-8 rounded-2xl shadow-lg z-10">
          <h2 className="text-2xl font-bold text-center mb-7 text-gray-800">
            Register
          </h2>
          {error && (
            <div className="mb-4 text-red-600 text-sm font-semibold">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pb-2 border-b border-gray-300 focus:outline-none focus:border-cyan-500 text-base bg-transparent"
              placeholder="User Name"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pb-2 border-b border-gray-300 focus:outline-none focus:border-cyan-500 text-base bg-transparent"
              placeholder="Email Address"
              required
              autoComplete="email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pb-2 border-b border-gray-300 focus:outline-none focus:border-cyan-500 text-base bg-transparent"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-cyan-400 hover:bg-cyan-500 text-white rounded-md font-semibold shadow transition-colors"
            >
              Sign Up
            </button>
          </form>
          <button
            onClick={handleGoogleLogin}
            className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285f4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34a853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#fbbc05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#ea4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-gray-600 font-medium text-sm">
              Continue with Google
            </span>
          </button>
          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-500 font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
