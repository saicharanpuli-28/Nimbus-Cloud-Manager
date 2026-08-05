import { useEffect, useState } from "react";
import api from "../api/api";
import MainLayout from "../layouts/MainLayout";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/api/auth/profile");
      setProfile(data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const formatStorage = (bytes) => {
    if (bytes < 1024) return `${bytes} Bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  return (
    <MainLayout>

      {!profile ? (

        <div className="flex justify-center items-center h-[70vh] text-white text-xl">
          Loading...
        </div>

      ) : (

        <div className="flex justify-center">

          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-lg p-8">

            <div className="flex flex-col items-center">

              <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-5xl font-bold">
                {profile.name.charAt(0).toUpperCase()}
              </div>

              <h1 className="text-3xl font-bold mt-5 text-white">
                {profile.name}
              </h1>

              <p className="text-slate-400">
                Nimbus Cloud User
              </p>

            </div>

            <div className="grid grid-cols-1 gap-5 mt-10">

              <div className="bg-[#111827] border border-slate-700 rounded-xl p-5">
                <p className="text-slate-400 text-sm">
                  Email
                </p>

                <p className="text-lg text-white mt-1">
                  {profile.email}
                </p>
              </div>

              <div className="bg-[#111827] border border-slate-700 rounded-xl p-5">
                <p className="text-slate-400 text-sm">
                  Member Since
                </p>

                <p className="text-lg text-white mt-1">
                  {new Date(profile.joined).toLocaleDateString()}
                </p>
              </div>

              <div className="bg-[#111827] border border-slate-700 rounded-xl p-5">
                <p className="text-slate-400 text-sm">
                  Total Files
                </p>

                <p className="text-lg text-white mt-1">
                  {profile.totalFiles}
                </p>
              </div>

              <div className="bg-[#111827] border border-slate-700 rounded-xl p-5">
                <p className="text-slate-400 text-sm">
                  Storage Used
                </p>

                <p className="text-lg text-white mt-1">
                  {formatStorage(profile.storageUsed)}
                </p>
              </div>

            </div>

          </div>

        </div>

      )}

    </MainLayout>
  );
}