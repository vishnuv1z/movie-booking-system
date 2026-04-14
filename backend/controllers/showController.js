const Show = require("../models/Show");
const Seat = require("../models/Seat");
const Screen = require("../models/Screen");

exports.createShow = async (req, res) => {
  try {
    const show = await Show.create(req.body);

    // Generate seats automatically
    const screen = await Screen.findById(req.body.screen);

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

    res.json(show);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

exports.getShowsByMovie = async (req, res) => {
  try {
    const shows = await Show.find({ movie: req.params.movieId })
      .populate("screen")
      .populate("movie");

    res.json(shows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};