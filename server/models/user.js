const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const userModel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    wishlist: [
      {
        type: ObjectId,
        ref: "product",
      },
    ],
  },
  { timestamps: true }
);
