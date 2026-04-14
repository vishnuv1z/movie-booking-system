const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const { createTheatre } = require("../controllers/theatreController");

router.post("/", protect, createTheatre);

module.exports = router;