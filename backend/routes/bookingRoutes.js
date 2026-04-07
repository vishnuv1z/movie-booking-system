const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { bookSeats } = require("../controllers/bookingController");

router.post("/", auth, bookSeats);
router.get("/my", auth, getUserBookings);

module.exports = router;