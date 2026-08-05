import {
  FileText,
  Image,
  Video,
  Star,
  Download,
  Trash2,
  MoreVertical,
} from "lucide-react";

const icons = {
  PDF: FileText,
  DOCX: FileText,
  TXT: FileText,
  JPG: Image,
  PNG: Image,
  MP4: Video,
};

function FileCard({ file }) {
  const Icon = icons[file.type] || FileText;

  return (
    <div className="bg-[#111827] border border-slate-700 rounded-2xl p-5 hover:border-blue-500 hover:-translate-y-1 transition-all duration-300">

      <div className="flex justify-between items-start">

        <div className="w-14 h-14 rounded-xl bg-blue-600/20 flex items-center justify-center">
          <Icon size={28} className="text-blue-400" />
        </div>

        <button className="text-slate-400 hover:text-white">
          <MoreVertical size={18} />
        </button>

      </div>

      <h2 className="text-white font-semibold text-lg mt-5 truncate">
        {file.name}
      </h2>

      <p className="text-slate-400 mt-1">
        {file.type} File
      </p>

      <div className="mt-5 flex justify-between text-sm text-slate-400">
        <span>{file.size}</span>
        <span>{file.date}</span>
      </div>

      <div className="mt-6 flex justify-between">

        <button className="hover:text-yellow-400 text-slate-400 transition">
          <Star size={18} />
        </button>

        <button className="hover:text-green-400 text-slate-400 transition">
          <Download size={18} />
        </button>

        <button className="hover:text-red-400 text-slate-400 transition">
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  );
}

export default FileCard;