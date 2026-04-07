const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Show",
  },
  seatNumber: String, // A1, A2
  status: {
    type: String,
    enum: ["available", "booked"],
    default: "available",
  },
  lockedBy: String,
  lockExpiresAt: Date
});

module.exports = mongoose.model("Seat", seatSchema);