"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // ✅ Import Link from next/link
import axios from "axios";
import { FiMail, FiLock } from "react-icons/fi"; // Import icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Email and password are required!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", { email, password });

      // Store token & email in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userEmail", response.data.email);

      console.log("✅ Login Successful - Token & Email Stored:", response.data);

      // Redirect to SearchBox Page
      router.push("/SearchBox");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Login failed");
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred");
      }
      console.error("❌ Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/travel.avif')",
        backgroundSize: "cover",
        height: "95vh",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200"
        style={{ boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)" }}
      >
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">Welcome Back!</h1>

        {/* Email Input */}
        <div className="relative mb-4">
          <FiMail className="absolute left-4 top-4 text-gray-500 text-lg" />
          <input
            type="email"
            placeholder="Email"
            className="pl-12 w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-4">
          <FiLock className="absolute left-4 top-4 text-gray-500 text-lg" />
          <input
            type="password"
            placeholder="Password"
            className="pl-12 w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold py-3 rounded-lg text-lg transition duration-300 shadow-md hover:shadow-lg"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline font-semibold">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
