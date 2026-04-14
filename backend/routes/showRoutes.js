const router = require("express").Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  createShow,
  getSeatsByShow,
  getShowsByMovie,
  getShowsByTheatre,
  updateShow,
  deleteShow,
} = require("../controllers/showController");

// Public routes
router.get("/:showId/seats", getSeatsByShow);
router.get("/movie/:movieId", getShowsByMovie);

// Protected routes for theatre owners
router.post("/", protect, authorize("theatreOwner", "admin"), createShow);
router.get(
  "/theatre/:theatreId",
  protect,
  authorize("theatreOwner", "admin"),
  getShowsByTheatre
);
router.put(
  "/:id",
  protect,
  authorize("theatreOwner", "admin"),
  updateShow
);
router.delete(
  "/:id",
  protect,
  authorize("theatreOwner", "admin"),
  deleteShow
);

module.exports = router;