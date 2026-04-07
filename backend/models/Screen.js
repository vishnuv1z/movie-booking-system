const mongoose = require("mongoose");

const screenSchema = new mongoose.Schema({
  theatre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theatre",
  },
  name: String, // Screen 1, Screen 2
  totalSeats: Number,
  rows: Number,
  cols: Number,
});

module.exports = mongoose.model("Screen", screenSchema);