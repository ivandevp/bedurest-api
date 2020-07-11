const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pinSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    image: String,
    link: { type: String, required: true },
    author: {
      name: String,
      image: String,
    },
    category: String,
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", pinSchema);
