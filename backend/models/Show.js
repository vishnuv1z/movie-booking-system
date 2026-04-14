const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    screen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screen",
      required: true,
    },
    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theatre",
      required: true,
    },
    showDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      default: 200,
    },
    premiumPrice: {
      type: Number,
      default: 350,
    },
    status: {
      type: String,
      enum: ["scheduled", "cancelled", "completed"],
      default: "scheduled",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Show", showSchema);