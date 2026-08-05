import multer from "multer";

// Store uploaded file in RAM temporarily
const storage = multer.memoryStorage();

// Optional: limit file size (10 MB)
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export default upload;