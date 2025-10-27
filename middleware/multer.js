import multer from "multer";

// ✅ Use in-memory storage — required for Vercel and Cloudinary
const storage = multer.memoryStorage();

// ✅ Create a universal multer instance
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit per file
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("❌ Only image files are allowed!"), false);
    }
  },
});

export default upload;

/*
✅ Usage Examples:

1️⃣ Single image upload:
   router.post("/upload", upload.single("image"), controllerFunc);

2️⃣ Multiple images upload:
   router.post("/upload", upload.array("images", 10), controllerFunc);

3️⃣ Mixed fields (e.g. image + banner):
   router.post("/upload", upload.fields([
       { name: "image", maxCount: 1 },
       { name: "banner", maxCount: 2 }
   ]), controllerFunc);
*/
