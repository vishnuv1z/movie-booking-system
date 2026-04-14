const router = require("express").Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  createTheatre,
  getMyTheatres,
  getTheatreById,
  updateTheatre,
  deleteTheatre,
  getTheatreBookings,
  getOwnerStats,
} = require("../controllers/theatreController");

// All routes require authentication + theatreOwner or admin role
router.use(protect);
router.use(authorize("theatreOwner", "admin"));

router.post("/", createTheatre);
router.get("/my", getMyTheatres);
router.get("/stats", getOwnerStats);
router.get("/:id", getTheatreById);
router.put("/:id", updateTheatre);
router.delete("/:id", deleteTheatre);
router.get("/:id/bookings", getTheatreBookings);

module.exports = router;