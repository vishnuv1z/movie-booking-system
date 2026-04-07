const Booking = require("../models/Booking");
const Seat = require("../models/Seat");

exports.bookSeats = async (req, res) => {
  try {
    const { showId, seats } = req.body;

    // ATOMIC CHECK + UPDATE
    const result = await Seat.updateMany(
      {
        show: showId,
        seatNumber: { $in: seats },
        status: "available",
      },
      { $set: { status: "booked" } }
    );

    if (result.modifiedCount !== seats.length) {
      return res.status(400).json({
        msg: "Some seats already booked",
      });
    }

    const booking = await Booking.create({
      user: req.user.id,
      show: showId,
      seats,
      totalPrice: seats.length * 200,
    });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("show");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};