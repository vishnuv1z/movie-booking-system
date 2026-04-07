const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Show",
  },
  seats: [String], // ["A1", "A2"]
  totalPrice: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);