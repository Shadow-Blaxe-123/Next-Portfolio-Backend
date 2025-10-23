import multer from "multer";

// Multer memory storage for serverless / personal portfolio
const storage = multer.memoryStorage();

export const multerUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // optional: 5MB limit
  },
});
