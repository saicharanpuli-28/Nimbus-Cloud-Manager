import File from "../models/File.js";

const toggleFavorite = async (req, res) => {
  try {
    const file = await File.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    file.favorite = !file.favorite;

    await file.save();

    res.status(200).json({
      success: true,
      favorite: file.favorite,
      message: file.favorite
        ? "Added to Favorites"
        : "Removed from Favorites",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update favorite",
      error: error.message,
    });
  }
};

export default toggleFavorite;