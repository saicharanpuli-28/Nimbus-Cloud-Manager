import { Eye, Download, Trash2 } from "lucide-react";
import api from "../api/api";

function FileActions({ file, onDelete, onPreview }) {
  const handleDownload = async () => {
    console.log("FILE OBJECT:", file);
    try {
      const response = await api.get(
        `/api/files/${encodeURIComponent(file.key)}/download`
      );

      if (response.data.success) {
        window.open(response.data.downloadUrl, "_blank");
      }
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download file.");
    }
  };

  return (
    <div className="flex items-center gap-3">

      {/* Preview */}

      <button
        onClick={() => onPreview(file)}
        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 transition"
        title="Preview"
      >
        <Eye size={16} />
        <span className="text-sm">Preview</span>
      </button>

      {/* Download */}

      <button
        onClick={handleDownload}
        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-green-400 transition"
        title="Download"
      >
        <Download size={16} />
        <span className="text-sm">Download</span>
      </button>

      {/* Delete */}

      <button
        onClick={() => onDelete(file.key)}
        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-800 hover:bg-red-600 text-red-400 hover:text-white transition"
        title="Delete"
      >
        <Trash2 size={16} />
        <span className="text-sm">Delete</span>
      </button>

    </div>
  );
}

export default FileActions;