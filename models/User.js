const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: String,
    name: String,
    image: String,
    isAdmin: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
