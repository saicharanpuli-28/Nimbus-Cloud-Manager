import express from "express";
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import s3 from "../config/aws.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await s3.send(new ListBucketsCommand({}));

    res.json({
      success: true,
      buckets: data.Buckets,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;