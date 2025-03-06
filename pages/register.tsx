import { useState } from "react";
import axios from "axios";
import Link from "next/link"; // ✅ Import Link from next/link
import { useRouter } from "next/router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) return alert("⚠️ All fields are required!");
    if (!validateEmail(email)) return alert("⚠️ Please enter a valid email address!");
    if (!validatePassword(password))
      return alert("⚠️ Password must include uppercase, lowercase, number, and special character!");

    try {
      setLoading(true);
      const response = await axios.post("/api/auth/register", { email, password, name });
      alert(`✅ ${response.data.message}`);
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "❌ Registration failed");
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred");
      }
      console.error("❌ Registration Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/travler1.jpg')",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <form
        onSubmit={handleRegister}
        className="relative z-10 bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg"
      >
        <h1 className="text-4xl font-extrabold text-green-600 text-center mb-8">Register</h1>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-800 mb-2">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="block w-full p-4 border border-gray-300 rounded-lg text-lg placeholder-gray-500 focus:ring-2 focus:ring-green-600 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-800 mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="block w-full p-4 border border-gray-300 rounded-lg text-lg placeholder-gray-500 focus:ring-2 focus:ring-green-600 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-800 mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="block w-full p-4 border border-gray-300 rounded-lg text-lg placeholder-gray-500 focus:ring-2 focus:ring-green-600 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-lg mb-6 shadow-md hover:shadow-lg transition-all duration-300"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="text-center">
          <p className="text-base text-gray-700">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
