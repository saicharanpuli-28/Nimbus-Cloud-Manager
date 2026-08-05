import express from "express";
import upload from "../middleware/upload.js";
import protect from "../middleware/authMiddleware.js";

import uploadFile from "../controllers/fileUploadController.js";
import listFiles from "../controllers/listFilesController.js";
import downloadFile from "../controllers/downloadFileController.js";
import deleteFile from "../controllers/deleteFileController.js";
import toggleFavorite from "../controllers/toggleFavoriteController.js";

const router = express.Router();

// List all files (only for logged-in user)
router.get("/", protect, listFiles);

// Download a file
router.get("/:key/download", protect, downloadFile);

// Delete a file
router.delete("/:key", protect, deleteFile);
// Toggle Favorite
router.patch("/:id/favorite", protect, toggleFavorite);

// Upload a file
router.post(
  "/upload",
  protect,
  upload.single("file"),
  uploadFile
);

export default router;