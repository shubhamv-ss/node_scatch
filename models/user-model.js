const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: [],
    },
  ],
  orders: {
    type: Array,
    default: [],
  },
  contact: Number,
  picture: String,
  address: String,
});

module.exports = mongoose.model("User", userSchema);
