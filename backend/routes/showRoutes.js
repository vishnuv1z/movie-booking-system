const router = require("express").Router();
const { createShow, getSeatsByShow } = require("../controllers/showController");

router.post("/", createShow);
router.get("/:showId/seats", getSeatsByShow);
router.get("/movie/:movieId", getShowsByMovie);

module.exports = router;