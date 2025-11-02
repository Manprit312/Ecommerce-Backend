import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

export const uploadFromBuffer = (fileBuffer, mimetype) => {
  return new Promise((resolve, reject) => {
    // ✅ Create unique file name
    const uniqueName = `product_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    // ✅ Detect file type
    const is3DModel = mimetype?.includes("glb") || mimetype?.includes("gltf");
    const resourceType = is3DModel ? "raw" : "image"; // Cloudinary treats .glb as raw files
    const folder = is3DModel ? "3d_models" : "products";

    // ✅ Create upload stream
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: uniqueName,
        resource_type: resourceType,
        overwrite: false,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    // ✅ Pipe buffer through streamifier (same as your old version)
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};
