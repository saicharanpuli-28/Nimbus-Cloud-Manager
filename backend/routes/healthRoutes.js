import express from "express";

const router = express.Router();

console.log("Health routes loaded");

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Nimbus Backend API is Working 🚀"
  });
});

export default router;