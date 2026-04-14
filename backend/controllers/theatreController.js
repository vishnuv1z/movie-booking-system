const Theatre = require("../models/Theatre");
const Screen = require("../models/Screen");
const Show = require("../models/Show");
const Booking = require("../models/Booking");

// Create a new theatre
exports.createTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.create({
      ...req.body,
      theatreOwner: req.user.id,
    });

    res.status(201).json(theatre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all theatres owned by the logged-in user
exports.getMyTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find({ theatreOwner: req.user.id }).sort({
      createdAt: -1,
    });

    // Attach screen count to each theatre
    const theatresWithCounts = await Promise.all(
      theatres.map(async (theatre) => {
        const screenCount = await Screen.countDocuments({
          theatre: theatre._id,
        });
        const showCount = await Show.countDocuments({
          theatre: theatre._id,
          status: "scheduled",
        });
        return {
          ...theatre.toObject(),
          screenCount,
          showCount,
        };
      })
    );

    res.json(theatresWithCounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single theatre by ID (with ownership check)
exports.getTheatreById = async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.params.id);

    if (!theatre) {
      return res.status(404).json({ msg: "Theatre not found" });
    }

    if (theatre.theatreOwner.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Access denied" });
    }

    res.json(theatre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update theatre
exports.updateTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.params.id);

    if (!theatre) {
      return res.status(404).json({ msg: "Theatre not found" });
    }

    if (theatre.theatreOwner.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Access denied" });
    }

    const updated = await Theatre.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete theatre (also deletes associated screens and shows)
exports.deleteTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.params.id);

    if (!theatre) {
      return res.status(404).json({ msg: "Theatre not found" });
    }

    if (theatre.theatreOwner.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Access denied" });
    }

    // Delete associated shows and screens
    await Show.deleteMany({ theatre: theatre._id });
    await Screen.deleteMany({ theatre: theatre._id });
    await Theatre.findByIdAndDelete(req.params.id);

    res.json({ msg: "Theatre deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get bookings for a theatre
exports.getTheatreBookings = async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.params.id);

    if (!theatre) {
      return res.status(404).json({ msg: "Theatre not found" });
    }

    if (theatre.theatreOwner.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Access denied" });
    }

    // Find all shows belonging to this theatre
    const shows = await Show.find({ theatre: theatre._id }).select("_id");
    const showIds = shows.map((s) => s._id);

    // Find all bookings for these shows
    const bookings = await Booking.find({ show: { $in: showIds } })
      .populate({
        path: "show",
        populate: [
          { path: "movie", select: "title poster" },
          { path: "screen", select: "name screenType" },
        ],
      })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get dashboard stats for theatre owner
exports.getOwnerStats = async (req, res) => {
  try {
    const theatres = await Theatre.find({ theatreOwner: req.user.id });
    const theatreIds = theatres.map((t) => t._id);

    const totalScreens = await Screen.countDocuments({
      theatre: { $in: theatreIds },
    });
    const totalShows = await Show.countDocuments({
      theatre: { $in: theatreIds },
      status: "scheduled",
    });

    // Get booking count
    const shows = await Show.find({ theatre: { $in: theatreIds } }).select(
      "_id"
    );
    const showIds = shows.map((s) => s._id);
    const totalBookings = await Booking.countDocuments({
      show: { $in: showIds },
    });

    // Calculate total revenue
    const revenueResult = await Booking.aggregate([
      { $match: { show: { $in: showIds } } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);

    res.json({
      totalTheatres: theatres.length,
      totalScreens,
      totalShows,
      totalBookings,
      totalRevenue: revenueResult[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};