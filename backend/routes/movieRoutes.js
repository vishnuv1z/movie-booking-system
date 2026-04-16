const router = require("express").Router();
const { addMovie, getMovies, getMovieById } = require("../controllers/movieController");

router.post("/", addMovie);
router.get("/", getMovies);
router.get("/:id", getMovieById);

module.exports = router;