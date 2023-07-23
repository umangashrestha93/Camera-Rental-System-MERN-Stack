const mongoose = require("mongoose");

const cameraSchema = new mongoose.Schema({
  user: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    email: String,
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
    type: String,
  },
  cameraType: {
    type: String,
  },
});

const Camera = mongoose.model("Camera", cameraSchema);

module.exports = Camera;
