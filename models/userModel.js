import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    displayName: String,
    email: { type: String, required: true },
    photoURL: String,
    lastLogin: { type: Date, default: Date.now },
    loginCount: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
