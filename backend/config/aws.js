import dotenv from "dotenv";
dotenv.config();

import { S3Client } from "@aws-sdk/client-s3";

console.log("========== AWS ENV ==========");
console.log("Region:", process.env.AWS_REGION);
console.log("Access Key Exists:", !!process.env.AWS_ACCESS_KEY_ID);
console.log("Secret Key Exists:", !!process.env.AWS_SECRET_ACCESS_KEY);
console.log("Bucket:", process.env.AWS_BUCKET_NAME);
console.log("=============================");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default s3;