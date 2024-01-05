const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 1, maxlength: 50 },
    avatar: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: { type: String, required: true },
  },
  { timestamps: true },
  { versionKey: false }
);


const UserModel = mongoose.model("User", userSchema);

module.exports = {UserModel};
