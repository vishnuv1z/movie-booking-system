const Show = require("../models/Show");
const Seat = require("../models/Seat");
const Screen = require("../models/Screen");
const Theatre = require("../models/Theatre");

// Create a new show
exports.createShow = async (req, res) => {
  try {
    // Verify theatre ownership
    const theatre = await Theatre.findById(req.body.theatre);
    if (!theatre) {
      return res.status(404).json({ msg: "Theatre not found" });
    }
    if (theatre.theatreOwner.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Access denied" });
    }

    const show = await Show.create(req.body);

    // Generate seats automatically based on screen layout
    const screen = await Screen.findById(req.body.screen);
    if (screen) {
      let seats = [];
      for (let i = 0; i < screen.rows; i++) {
        for (let j = 1; j <= screen.cols; j++) {
          seats.push({
            show: show._id,
            seatNumber: String.fromCharCode(65 + i) + j,
          });
        }
      }
      await Seat.insertMany(seats);
    }

    const populated = await Show.findById(show._id)
      .populate("movie", "title poster duration language")
      .populate("screen", "name screenType totalSeats")
      .populate("theatre", "name location");

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get seats by show
exports.getSeatsByShow = async (req, res) => {
  try {
    const seats = await Seat.find({ show: req.params.showId });

    const grouped = {};
    seats.forEach((seat) => {
      const row = seat.seatNumber.charAt(0);
      if (!grouped[row]) grouped[row] = [];
      grouped[row].push(seat);
    });

    res.json(grouped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get shows by movie
exports.getShowsByMovie = async (req, res) => {
  try {
    const shows = await Show.find({ movie: req.params.movieId })
      .populate("screen")
      .populate("movie")
      .populate("theatre", "name location city");

    res.json(shows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get shows by theatre (for theatre owner)
exports.getShowsByTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.params.theatreId);
    if (!theatre) {
      return res.status(404).json({ msg: "Theatre not found" });
    }
    if (theatre.theatreOwner.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Access denied" });
    }

    const shows = await Show.find({ theatre: req.params.theatreId })
      .populate("movie", "title poster duration language genre")
      .populate("screen", "name screenType totalSeats")
      .sort({ showDate: -1, startTime: -1 });

    res.json(shows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a show
exports.updateShow = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);
    if (!show) {
      return res.status(404).json({ msg: "Show not found" });
    }

    const theatre = await Theatre.findById(show.theatre);
    if (!theatre || theatre.theatreOwner.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Access denied" });
    }

    const updated = await Show.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("movie", "title poster duration language genre")
      .populate("screen", "name screenType totalSeats");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a show (also deletes associated seats)
exports.deleteShow = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);
    if (!show) {
      return res.status(404).json({ msg: "Show not found" });
    }

    const theatre = await Theatre.findById(show.theatre);
    if (!theatre || theatre.theatreOwner.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Access denied" });
    }

    await Seat.deleteMany({ show: show._id });
    await Show.findByIdAndDelete(req.params.id);

    res.json({ msg: "Show deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};