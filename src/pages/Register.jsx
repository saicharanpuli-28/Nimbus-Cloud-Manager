import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful!");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-6">
      <div className="w-[430px] bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-5xl font-bold text-center text-blue-600">
          ☁ Nimbus
        </h1>

        <p className="text-center text-gray-500 mt-2 text-sm">
          Create your Nimbus account
        </p>

        <div className="mt-8">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 mb-5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

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
            onClick={handleRegister}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-semibold transition"
          >
            Create Account
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full mt-4 border border-blue-600 text-blue-600 hover:bg-blue-50 p-4 rounded-xl font-semibold transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;