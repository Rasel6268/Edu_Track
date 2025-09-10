import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";

const Login = () => {
  const { login } = useAuth();

  // local state for form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate('/dashboard') 
      toast.success("Login successful!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Student Login
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center justify-center space-x-2 text-gray-500">
          <span>or login with</span>
        </div>

        {/* Google Login (optional, not implemented yet) */}
        <button
          type="button"
          className="flex items-center justify-center w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          <FaGoogle className="mr-2" /> Google
        </button>

        <p className="mt-4 text-center text-gray-500">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 font-semibold">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
