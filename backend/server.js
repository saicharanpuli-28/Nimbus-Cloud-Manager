import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from "node:dns";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

import healthRoutes from "./routes/healthRoutes.js";
import awsTestRoutes from "./routes/awsTestRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

import { logToCloudWatch } from "./services/cloudWatchService.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

console.log("Mongo URI exists:", !!process.env.MONGODB_URI);

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", healthRoutes);
app.use("/api/aws", awsTestRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/favorites", favoriteRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  try {
    await logToCloudWatch(
      `🚀 Nimbus Server Started Successfully on Port ${PORT}`
    );
  } catch (error) {
    console.error("CloudWatch Startup Log Failed:", error.message);
  }
});