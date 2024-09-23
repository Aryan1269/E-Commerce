const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const userModel = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password : {
      type : String,
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


module.exports = mongoose.model('user',userModel);