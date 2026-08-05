import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "../config/aws.js";

const downloadFile = async (req, res) => {
  try {
    const { key } = req.params;

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: decodeURIComponent(key),
    });

    const downloadUrl = await getSignedUrl(s3, command, {
      expiresIn: 300, // 5 minutes
    });

    res.status(200).json({
      success: true,
      downloadUrl,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate download link",
      error: error.message,
    });
  }
};

export default downloadFile;