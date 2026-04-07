const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: Number,
  language: String,
  releaseDate: Date,
});

module.exports = mongoose.model("Movie", movieSchema);