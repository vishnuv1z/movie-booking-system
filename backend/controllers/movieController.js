const Movie = require("../models/Movie");

exports.addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};