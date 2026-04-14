const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Movie title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number, // in minutes
    },
    language: {
      type: String,
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
    },
    rating: {
      type: String,
      trim: true,
    },
    poster: {
      type: String,
      trim: true,
    },
    releaseDate: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);