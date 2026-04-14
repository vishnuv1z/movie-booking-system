const Screen = require("../models/Screen");
const Theatre = require("../models/Theatre");

// Create a new screen for a theatre
exports.createScreen = async (req, res) => {
  try {
    // Verify theatre ownership
    const theatre = await Theatre.findById(req.body.theatre);
    if (!theatre) {
      return res.status(404).json({ msg: "Theatre not found" });
    }
    if (theatre.theatreOwner.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Access denied" });
    }

    const screen = await Screen.create({
      ...req.body,
      totalSeats: req.body.rows * req.body.cols,
    });

    // Update theatre screen count
    const screenCount = await Screen.countDocuments({ theatre: theatre._id });
    await Theatre.findByIdAndUpdate(theatre._id, { totalScreens: screenCount });

    res.status(201).json(screen);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all screens for a theatre
exports.getScreensByTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.params.theatreId);
    if (!theatre) {
      return res.status(404).json({ msg: "Theatre not found" });
    }
    if (theatre.theatreOwner.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Access denied" });
    }

    const screens = await Screen.find({ theatre: req.params.theatreId }).sort({
      name: 1,
    });
    res.json(screens);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a screen
exports.updateScreen = async (req, res) => {
  try {
    const screen = await Screen.findById(req.params.id).populate("theatre");
    if (!screen) {
      return res.status(404).json({ msg: "Screen not found" });
    }
    if (screen.theatre.theatreOwner.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Access denied" });
    }

    // Recalculate totalSeats if rows or cols changed
    if (req.body.rows || req.body.cols) {
      req.body.totalSeats =
        (req.body.rows || screen.rows) * (req.body.cols || screen.cols);
    }

    const updated = await Screen.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a screen
exports.deleteScreen = async (req, res) => {
  try {
    const screen = await Screen.findById(req.params.id).populate("theatre");
    if (!screen) {
      return res.status(404).json({ msg: "Screen not found" });
    }
    if (screen.theatre.theatreOwner.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Access denied" });
    }

    const theatreId = screen.theatre._id;
    await Screen.findByIdAndDelete(req.params.id);

    // Update theatre screen count
    const screenCount = await Screen.countDocuments({ theatre: theatreId });
    await Theatre.findByIdAndUpdate(theatreId, { totalScreens: screenCount });

    res.json({ msg: "Screen deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};