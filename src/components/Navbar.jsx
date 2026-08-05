import { Search, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const userName = user?.name || "User";
  const firstLetter = userName.charAt(0).toUpperCase();

  return (
    <div className="h-20 bg-[#0B1220] border-b border-slate-800 flex items-center justify-between px-8">

      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {userName} 👋
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Everything you need, in one secure workspace.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="flex items-center bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 w-80">
          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search files..."
            className="bg-transparent outline-none text-white ml-3 flex-1 placeholder:text-slate-500"
          />
        </div>

        {/* Notification */}
        <button className="w-11 h-11 rounded-xl bg-[#111827] border border-slate-700 flex items-center justify-center hover:border-blue-500 transition">
          <Bell
            size={18}
            className="text-slate-300"
          />
        </button>

        {/* Upload */}
        <button
          onClick={() => navigate("/upload")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          Upload
        </button>

        {/* Avatar */}
        <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
          {firstLetter}
        </div>

      </div>

    </div>
  );
}

export default Navbar;