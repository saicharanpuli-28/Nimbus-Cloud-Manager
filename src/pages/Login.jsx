import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      // Save JWT
      localStorage.setItem("token", res.data.token);

      // Save user object
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
        })
      );

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-6">
      <div className="w-[430px] bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-5xl font-bold text-center text-blue-600">
          ☁ Nimbus
        </h1>

        <p className="text-center text-gray-500 mt-2 text-sm">
          Your Cloud. Your Workspace.
        </p>

        <p className="text-center text-gray-500 mt-6">
          Welcome back! Sign in to continue.
        </p>

        <div className="mt-8">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 mb-5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleLogin}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-semibold transition"
          >
            Sign In
          </button>

          <button
            onClick={() => navigate("/register")}
            className="w-full mt-4 border border-blue-600 text-blue-600 hover:bg-blue-50 p-4 rounded-xl font-semibold transition"
          >
            Create Account
          </button>

          <p className="text-center text-gray-500 mt-6 cursor-pointer hover:text-blue-600">
            Forgot Password?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;