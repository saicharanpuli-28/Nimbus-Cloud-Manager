import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/StatCard";
import api from "../api/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalFiles: 0,
    totalUploads: 0,
    storageUsed: 0,
    lastUpload: null,
  });

  const [recentFiles, setRecentFiles] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const statsRes = await api.get("/api/dashboard");
      setStats(statsRes.data);

      const filesRes = await api.get("/api/files");

      if (filesRes.data.success) {
        setRecentFiles(filesRes.data.files.slice(0, 5));
      }
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  const formatStorage = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024)
      return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  return (
    <MainLayout>
      {/* Statistics */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

        <StatCard
          title="Storage Used"
          value={formatStorage(stats.storageUsed)}
          subtitle="Your uploaded files"
        />

        <StatCard
          title="Total Files"
          value={stats.totalFiles}
          subtitle="Owned by you"
        />

        <StatCard
          title="Uploads"
          value={stats.totalUploads}
          subtitle="Total uploads"
        />

        <StatCard
          title="Last Upload"
          value={
            stats.lastUpload
              ? new Date(stats.lastUpload).toLocaleDateString()
              : "No uploads"
          }
          subtitle="Most recent upload"
        />

      </div>

      {/* Recent Upload Activity */}
      <div className="mt-10">

        <h2 className="text-2xl font-semibold text-white mb-5">
          Recent Upload Activity
        </h2>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">

          {recentFiles.length === 0 ? (

            <div className="p-8 text-center text-slate-400">
              No uploads yet.
            </div>

          ) : (

            recentFiles.map((file) => (

              <div
                key={file._id}
                className="flex justify-between items-center px-6 py-5 border-b border-slate-700 last:border-none hover:bg-slate-900 transition"
              >

                <div>

                  <h3 className="text-white font-medium">
                    {file.name}
                  </h3>

                  <p className="text-slate-400 text-sm">
                    Uploaded on{" "}
                    {new Date(file.uploadedAt).toLocaleString()}
                  </p>

                </div>

                <span className="text-green-400 font-medium">
                  Uploaded
                </span>

              </div>

            ))

          )}

        </div>

      </div>

    </MainLayout>
  );
}

export default Dashboard;