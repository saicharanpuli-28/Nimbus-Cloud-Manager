import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/aws.js";
import File from "../models/File.js";

const deleteFile = async (req, res) => {
  try {
    const { key } = req.params;

    // Find the file owned by the logged-in user
    const file = await File.findOne({
      key: decodeURIComponent(key),
      owner: req.user._id,
    });

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    // Delete from S3
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.key,
    });

    await s3.send(command);

    // Delete from MongoDB
    await File.deleteOne({ _id: file._id });

    res.status(200).json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete file",
      error: error.message,
    });
  }
};

export default deleteFile;