import {
  LayoutDashboard,
  Folder,
  Upload,
  Wrench,
  Star,
  Trash2,
  User,
  
  Cloud,
  HardDrive,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "My Files", icon: Folder, path: "/myfiles" },
    { name: "Upload", icon: Upload, path: "/upload" },
    { name: "Tools", icon: Wrench, path: "/tools" },
    { name: "Favorites", icon: Star, path: "/favorites" },
    { name: "Trash", icon: Trash2, path: "/trash" },
    { name: "Profile", icon: User, path: "/profile" },
   
  ];

  return (
    <aside className="w-72 h-screen bg-[#08101D] border-r border-slate-800 flex flex-col fixed">

      {/* Logo */}

      <div className="px-8 py-8 border-b border-slate-800">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">

            <Cloud size={26} />

          </div>

          <div>

            <h1 className="text-2xl font-bold text-white">
              Nimbus
            </h1>

            <p className="text-slate-400 text-sm">
              Your Cloud. Your Workspace.
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="mt-6 flex-1 px-4">

        {menu.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl mb-2 transition-all ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

      </nav>

      {/* Storage Card */}

      <div className="m-5 p-5 rounded-2xl bg-[#111827] border border-slate-700">

        <div className="flex items-center gap-2 mb-4">

          <HardDrive className="text-blue-400" size={20} />

          <h3 className="font-semibold text-white">
            Storage
          </h3>

        </div>

        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">

          <div className="w-1/3 h-full bg-blue-500 rounded-full"></div>

        </div>

        <p className="text-slate-400 text-sm mt-3">
          2.4 GB of 25 GB used
        </p>

        <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-2 text-white font-medium transition">
          Upgrade
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
