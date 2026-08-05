import File from "../models/File.js";

export const toggleFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    const file = await File.findOne({
      _id: id,
      owner: req.user._id,
    });

    if (!file) {
      return res.status(404).json({
        message: "File not found",
      });
    }

    file.favorite = !file.favorite;

    await file.save();

    res.status(200).json({
      message: file.favorite
        ? "Added to Favorites"
        : "Removed from Favorites",
      favorite: file.favorite,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const files = await File.find({
      owner: req.user._id,
      favorite: true,
    }).sort({ createdAt: -1 });

    res.status(200).json(files);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};