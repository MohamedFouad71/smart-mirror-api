const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    profile: {
      name: String,
      age: Number,
      heightCm: Number,
      weightKg: Number,
      goal: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
