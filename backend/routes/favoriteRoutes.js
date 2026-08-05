import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  toggleFavorite,
  getFavorites,
} from "../controllers/favoriteController.js";

const router = express.Router();

router.get("/", protect, getFavorites);

router.put("/:id", protect, toggleFavorite);

export default router;