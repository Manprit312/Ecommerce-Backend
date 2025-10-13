import multer from "multer";

// ✅ CORRECT: Use memoryStorage to get file.buffer for Cloudinary
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

export default upload;

// Usage in your route:
// router.put("/products/:id", upload.array("images", 10), updateProduct);