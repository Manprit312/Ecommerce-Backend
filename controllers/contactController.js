import ContactSettings from "../models/ContactSettings.js";

export const getContactSettings = async (req, res) => {
  let settings = await ContactSettings.findOne();

  if (!settings) {
    settings = await ContactSettings.create({
      email: "",
      phone: "",
      address: "",
    });
  }

  res.json(settings);
};

export const updateContactSettings = async (req, res) => {
  const { email, phone, address } = req.body;

  const updated = await ContactSettings.findOneAndUpdate(
    {},
    { email, phone, address },
    { new: true, upsert: true }
  );

  res.json(updated);
};
