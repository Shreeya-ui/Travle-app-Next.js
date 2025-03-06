"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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

      // ✅ Store token & email in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userEmail", response.data.email);

      console.log("✅ Login Successful - Token & Email Stored:", response.data);

      // ✅ Redirect to SearchBox Page instead of Profile
      router.push("/");
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
      console.error("❌ Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/travle.avif')",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="block w-full p-4 mb-4 border border-gray-300 rounded-lg text-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full p-4 mb-4 border border-gray-300 rounded-lg text-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-lg"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
