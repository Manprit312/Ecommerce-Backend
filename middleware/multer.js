import multer from "multer";

// ✅ Use in-memory storage — required for Vercel and Cloudinary
const storage = multer.memoryStorage();

// ✅ Create a universal multer instance
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // increased to 50MB for large .glb files
  },
  fileFilter: (req, file, cb) => {
    // ✅ Allow images and .glb / .gltf 3D files
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
      "model/gltf-binary",   // .glb
      "model/gltf+json",     // .gltf
      "application/octet-stream", // sometimes used for .glb
    ];

    if (
      allowedMimeTypes.includes(file.mimetype) ||
      file.originalname.toLowerCase().endsWith(".glb") ||
      file.originalname.toLowerCase().endsWith(".gltf")
    ) {
      cb(null, true);
    } else {
      cb(new Error("❌ Only image and .glb/.gltf files are allowed!"), false);
    }
  },
});
export default upload;
