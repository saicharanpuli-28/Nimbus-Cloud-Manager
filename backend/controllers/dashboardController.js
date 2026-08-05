import File from "../models/File.js";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get all files belonging to the logged-in user
    const files = await File.find({ owner: userId });

    const totalFiles = files.length;

    const storageUsed = files.reduce((total, file) => total + file.size, 0);

    const lastUpload =
      files.length > 0
        ? files.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )[0].createdAt
        : null;

    res.status(200).json({
      totalFiles,
      totalUploads: totalFiles,
      storageUsed,
      lastUpload,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      message: "Failed to fetch dashboard statistics",
    });
  }
};