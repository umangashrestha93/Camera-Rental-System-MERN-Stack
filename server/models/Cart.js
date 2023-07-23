const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    email: String,
  },
  product: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      cover: {
        type: String,
      },
      name: {
        type: String,
      },
      location: {
        type: String,
      },
      category: {
        type: String,
      },
      price: {
        type: Number,
      },
      type: {
        type: String,
      },
      quantity: {
        type: Number,
        min: 1,
        required: true,
      },
      totalPrice: {
        type: Number,
        min: 0,
        required: true,
      },
    },
  ],
  quantity: {
    type: Number,
    min: 1,
  },
  totalPrice: {
    type: Number,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
