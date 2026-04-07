const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { createTheatre } = require("../controllers/theatreController");

router.post("/", auth, createTheatre);

module.exports = router;