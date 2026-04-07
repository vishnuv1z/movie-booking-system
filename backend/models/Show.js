const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
  screen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Screen",
  },
  startTime: Date,
  endTime: Date,
  price: Number,
});

module.exports = mongoose.model("Show", showSchema);