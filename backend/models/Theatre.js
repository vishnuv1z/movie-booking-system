const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema({
  name: String,
  location: String,
  theatreOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Theatre", theatreSchema);