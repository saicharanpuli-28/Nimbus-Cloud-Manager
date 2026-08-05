import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/aws.js";
import File from "../models/File.js";
import { logToCloudWatch } from "../services/cloudWatchService.js";

const uploadFile = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Unique S3 key
    const fileKey = `${Date.now()}-${req.file.originalname}`;

    // Upload to S3
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));

    // Save metadata to MongoDB
    const uploadedFile = await File.create({
      name: req.file.originalname,
      key: fileKey,
      size: req.file.size,
      mimeType: req.file.mimetype,
      owner: req.user._id,
    });

    // Log successful upload to CloudWatch
    await logToCloudWatch(
      `📤 File Uploaded | User: ${req.user._id} | File: ${req.file.originalname} | Size: ${req.file.size} bytes`
    );

    res.status(200).json({
      success: true,
      message: "File uploaded successfully!",
      file: uploadedFile,
    });

  } catch (error) {
    console.error(error);

    // Log upload failure to CloudWatch
    await logToCloudWatch(
      `❌ Upload Failed | Error: ${error.message}`
    );

    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
};

export default uploadFile;