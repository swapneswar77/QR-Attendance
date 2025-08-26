const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  qrCode: { type: String, required: true },  // Store QR code data for old students
});

const User = mongoose.model("User", userSchema);

module.exports = User;
