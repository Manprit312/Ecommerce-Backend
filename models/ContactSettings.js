import mongoose from "mongoose";

const contactSettingsSchema = new mongoose.Schema({
  email: String,
  phone: String,
  address: String,
});

export default mongoose.models.ContactSettings ||
  mongoose.model("ContactSettings", contactSettingsSchema);
