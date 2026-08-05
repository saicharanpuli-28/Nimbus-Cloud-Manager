import File from "../models/File.js";

const listFiles = async (req, res) => {
  try {
    const files = await File.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    const formattedFiles = files.map((file) => ({
      _id: file._id,
      name: file.name,
      key: file.key,
      size: file.size,
      mimeType: file.mimeType,
      favorite: file.favorite,
      uploadedAt: file.createdAt,
    }));

    res.status(200).json({
      success: true,
      files: formattedFiles,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch files",
      error: error.message,
    });
  }
};

export default listFiles;