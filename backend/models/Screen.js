const mongoose = require("mongoose");

const screenSchema = new mongoose.Schema(
  {
    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theatre",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Screen name is required"],
      trim: true,
    },
    screenType: {
      type: String,
      enum: ["Standard", "Premium", "IMAX", "4DX"],
      default: "Standard",
    },
    totalSeats: Number,
    rows: {
      type: Number,
      required: true,
    },
    cols: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Screen", screenSchema);