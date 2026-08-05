import { useRef, useState, useEffect, useMemo } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../api/api";
import {
  Upload,
  FilePlus,
  Image,
  Video,
  FileText,
} from "lucide-react";
import SearchBar from "../components/SearchBar";
import FileActions from "../components/FileActions";
import PreviewModal from "../components/PreviewModal";

function UploadLab() {
  const fileInputRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showPreview, setShowPreview] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const fetchFiles = async () => {
    try {
      const response = await api.get("/api/files");
      if (response.data.success) setFiles(response.data.files);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleChooseFile = () => fileInputRef.current.click();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setMessage("");

      const response = await api.post("/api/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message);
      await fetchFiles();
    } catch (err) {
      console.error(err);
      setMessage("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

 const handleDelete = async (fileKey) => {
  if (!window.confirm("Delete this file?")) return;

  try {
    await api.delete(`/api/files/${encodeURIComponent(fileKey)}`);
    setMessage("File deleted successfully!");
    await fetchFiles();
  } catch (err) {
    console.error(err);
    setMessage("Delete failed!");
  }
};

  const handlePreview = async (file) => {
    try {
      const response = await api.get(
        `/api/files/${encodeURIComponent(file.key)}/download`
      );

      if (response.data.success) {
        setSelectedFile(file);
        setPreviewUrl(response.data.downloadUrl);
        setShowPreview(true);
      }
    } catch (err) {
      console.error(err);
      alert("Preview failed");
    }
  };

  const filteredFiles = useMemo(() => {
    return files.filter((file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [files, searchTerm]);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Upload Files</h1>
          <p className="text-slate-400 mt-2">
            Securely upload and manage your files in Nimbus Cloud.
          </p>
        </div>

        <div className="border-2 border-dashed border-slate-700 rounded-3xl bg-[#111827] p-16">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-blue-600/20 flex items-center justify-center">
              <Upload size={42} className="text-blue-400" />
            </div>

            <h2 className="text-white text-2xl font-semibold mt-8">
              Drag & Drop Files Here
            </h2>

            <button
              onClick={handleChooseFile}
              disabled={uploading}
              className="mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl text-white"
            >
              {uploading ? "Uploading..." : "Choose Files"}
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleUpload}
              className="hidden"
            />

            {message && (
              <p className="text-green-400 mt-4">{message}</p>
            )}
          </div>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div>
          <h2 className="text-white text-2xl font-semibold mb-5">
            Recent Uploads
          </h2>

          <div className="bg-[#111827] border border-slate-700 rounded-2xl">

            {filteredFiles.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                No matching files.
              </div>
            ) : (
              filteredFiles.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between px-6 py-5 border-b border-slate-700"
                >
                  <div className="flex items-center gap-4">
                    <FileText size={22} className="text-blue-400" />

                    <div>
                      <p className="text-white">{file.name}</p>
                      <p className="text-slate-400 text-sm">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>

                  <FileActions
                    file={file}
                    onDelete={handleDelete}
                    onPreview={handlePreview}
                  />
                </div>
              ))
            )}

          </div>
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

export default UploadLab;
