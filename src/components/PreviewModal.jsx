function PreviewModal({ isOpen, onClose, file, previewUrl }) {
  if (!isOpen || !file) return null;

  const extension = file.name.split(".").pop().toLowerCase();

  const imageTypes = ["jpg", "jpeg", "png", "gif", "webp"];
  const videoTypes = ["mp4", "mov", "webm"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="bg-[#111827] rounded-2xl shadow-2xl w-[90%] max-w-4xl p-6">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-white text-xl font-semibold">
            {file.name}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ✕
          </button>

        </div>

        {/* Preview */}

        <div className="flex justify-center">

          {imageTypes.includes(extension) ? (

            <img
              src={previewUrl}
              alt={file.name}
              className="max-h-[70vh] rounded-xl"
            />

          ) : videoTypes.includes(extension) ? (

            <video
              controls
              className="max-h-[70vh] rounded-xl"
            >
              <source src={previewUrl} />
            </video>

          ) : extension === "pdf" ? (

            <div className="text-center">

              <p className="text-white mb-6">
                PDF Preview
              </p>

              <button
                onClick={() => window.open(previewUrl, "_blank")}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white"
              >
                Open PDF
              </button>

            </div>

          ) : (

            <div className="text-center">

              <p className="text-slate-300 text-lg">
                Preview not available for this file type.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default PreviewModal;