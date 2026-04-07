const router = require("express").Router();
const { addMovie, getMovies } = require("../controllers/movieController");

router.post("/", addMovie);
router.get("/", getMovies);

module.exports = router;