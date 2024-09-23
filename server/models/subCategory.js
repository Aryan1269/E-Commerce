const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const Subcategory = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: [2, "too short"],
      maxlength: [32, "too large"],
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: {
      type: ObjectId,
      required: true,
      ref: "Category",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subcategory", Subcategory);
