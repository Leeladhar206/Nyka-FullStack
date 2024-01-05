const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 1, maxlength: 50 },
    picture: { type: String },
    description: { type: String },
    gender: { type: String, enum: ["male", "female"], required: true },
    category: {
      type: String,
      enum: ["makeup", "skincare", "haircare"],
      required: true,
    },
    price: { type: Number, required: true },
  },
  { timestamps: true },
  { versionKey: false }
);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = { ProductModel };
