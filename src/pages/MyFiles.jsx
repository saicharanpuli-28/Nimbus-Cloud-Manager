import { useEffect, useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import FileStats from "../components/FileStats";
import PreviewModal from "../components/PreviewModal";
import api from "../api/api";
import {
  Search,
  Upload,
  Download,
  Eye,
  Trash2,
  FileText,
  Image,
  Video,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function MyFiles() {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [showPreview, setShowPreview] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const fetchFiles = async () => {
    try {
      const res = await api.get("/api/files");

      if (res.data.success) {
        setFiles(res.data.files);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const filteredFiles = useMemo(() => {
    return files.filter((file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [files, searchTerm]);

  const totalStorage = useMemo(() => {
    return files.reduce((sum, file) => sum + file.size, 0);
  }, [files]);

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024)
      return (bytes / 1024).toFixed(1) + " KB";
    if (bytes < 1024 * 1024 * 1024)
      return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  };

  const getIcon = (mime) => {
    if (mime?.startsWith("image"))
      return <Image className="text-green-400" size={20} />;

    if (mime?.startsWith("video"))
      return <Video className="text-purple-400" size={20} />;

    return <FileText className="text-blue-400" size={20} />;
  };

  const handlePreview = async (file) => {
    try {
      const res = await api.get(
        `/api/files/${encodeURIComponent(file.key)}/download`
      );

      if (res.data.success) {
        setSelectedFile(file);
        setPreviewUrl(res.data.downloadUrl);
        setShowPreview(true);
      }
    } catch (err) {
      alert("Preview failed");
    }
  };

  const handleDownload = async (file) => {
    try {
      const res = await api.get(
        `/api/files/${encodeURIComponent(file.key)}/download`
      );

      if (res.data.success) {
        window.open(res.data.downloadUrl, "_blank");
      }
    } catch (err) {
      alert("Download failed");
    }
  };

  const handleDelete = async (file) => {
    if (!window.confirm(`Delete ${file.name}?`)) return;

    try {
      await api.delete(
        `/api/files/${encodeURIComponent(file.key)}`
      );

      fetchFiles();
    } catch (err) {
      alert("Delete failed");
    }
  };
  const handleFavorite = async (file) => {
  try {
    await api.patch(`/api/files/${file._id}/favorite`);

    setFiles((prev) =>
      prev.map((f) =>
        f._id === file._id
          ? { ...f, favorite: !f.favorite }
          : f
      )
    );
  } catch (err) {
    console.error(err);
    alert("Failed to update favorite.");
  }
};
    return (
    <MainLayout>
      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-white">
              My Files
            </h1>

            <p className="text-slate-400 mt-2">
              Browse and manage all your cloud files.
            </p>
          </div>

          <button
            onClick={() => navigate("/upload")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white"
          >
            <Upload size={18} />
            Upload File
          </button>

        </div>

        <div className="grid grid-cols-3 gap-6">

          <FileStats
            title="Total Files"
            value={files.length}
            color="#60A5FA"
          />

          <FileStats
            title="Storage Used"
            value={formatSize(totalStorage)}
            color="#34D399"
          />

          <FileStats
  title="Favorites"
  value={files.filter(file => file.favorite).length}
  color="#FBBF24"
/>

        </div>

        <div className="flex items-center bg-[#111827] border border-slate-700 rounded-xl px-4">

          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent flex-1 py-4 ml-3 outline-none text-white placeholder:text-slate-500"
          />

        </div>

        <div className="bg-[#111827] border border-slate-700 rounded-2xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-900">

              <tr className="text-left text-slate-400">

                <th className="p-4">Name</th>
                <th className="p-4">Size</th>
                <th className="p-4">Uploaded</th>
                <th className="p-4 text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center py-8 text-slate-400"
                  >
                    Loading...
                  </td>

                </tr>

              ) : filteredFiles.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center py-8 text-slate-400"
                  >
                    No Files Found
                  </td>

                </tr>

              ) : (

                filteredFiles.map((file) => (

                  <tr
                    key={file._id}
                    className="border-t border-slate-700 hover:bg-slate-900/40"
                  >

                    <td className="p-4">

                      <div className="flex items-center gap-3">

                        {getIcon(file.mimeType)}

                        <span className="text-white">
                          {file.name}
                        </span>

                      </div>

                    </td>

                    <td className="p-4 text-slate-300">
                      {formatSize(file.size)}
                    </td>

                    <td className="p-4 text-slate-300">
                      {new Date(file.uploadedAt).toLocaleDateString()}
                    </td>

                    <td className="p-4">

                      <div className="flex justify-center gap-4">

                        <button
                          onClick={() => handlePreview(file)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => handleDownload(file)}
                          className="text-green-400 hover:text-green-300"
                        >
                          <Download size={18} />
                        </button>
                        <button
  onClick={() => handleFavorite(file)}
  className={
    file.favorite
      ? "text-yellow-400 hover:text-yellow-300"
      : "text-slate-500 hover:text-yellow-400"
  }
>
  <Star
    size={18}
    fill={file.favorite ? "currentColor" : "none"}
  />
</button>

                        <button
                          onClick={() => handleDelete(file)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        <PreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          file={selectedFile}
          previewUrl={previewUrl}
        />

      </div>
    </MainLayout>
  );
}

export default MyFiles;