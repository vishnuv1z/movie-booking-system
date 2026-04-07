const Theatre = require("../models/Theatre");

exports.createTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.create({
      ...req.body,
      theatreOwner: req.user.id,
    });

    res.json(theatre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};