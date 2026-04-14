const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const { bookSeats, getUserBookings } = require("../controllers/bookingController");

router.post("/", protect, bookSeats);
router.get("/my", protect, getUserBookings);

module.exports = router;