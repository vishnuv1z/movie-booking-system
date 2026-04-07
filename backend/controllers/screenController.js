const Screen = require("../models/Screen");

exports.createScreen = async (req, res) => {
  try {
    const screen = await Screen.create(req.body);
    res.json(screen);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};