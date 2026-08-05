import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../api/api";
import { Star } from "lucide-react";

function Favorites() {
  const [files, setFiles] = useState([]);

  const fetchFavorites = async () => {
    try {
      const res = await api.get("/api/files");

      if (res.data.success) {
        setFiles(res.data.files.filter(file => file.favorite));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <MainLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Favorites
          </h1>

          <p className="text-slate-400 mt-2">
            Your favorite files.
          </p>
        </div>

        {files.length === 0 ? (
          <div className="bg-[#111827] border border-slate-700 rounded-2xl p-10 text-center">

            <Star
              size={50}
              className="mx-auto text-yellow-400 mb-4"
              fill="currentColor"
            />

            <h2 className="text-xl font-semibold text-white">
              No Favorites Yet
            </h2>

            <p className="text-slate-400 mt-2">
              Mark files as favorites to see them here.
            </p>

          </div>
        ) : (
          <div className="bg-[#111827] border border-slate-700 rounded-2xl overflow-hidden">

            <table className="w-full">

              <thead className="bg-slate-900">

                <tr className="text-left text-slate-400">
                  <th className="p-4">File Name</th>
                  <th className="p-4">Size</th>
                </tr>

              </thead>

              <tbody>

                {files.map(file => (

                  <tr
                    key={file._id}
                    className="border-t border-slate-700"
                  >
                    <td className="p-4 text-white">
                      {file.name}
                    </td>

                    <td className="p-4 text-slate-300">
                      {(file.size / 1024).toFixed(1)} KB
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>
    </MainLayout>
  );
}

export default Favorites;