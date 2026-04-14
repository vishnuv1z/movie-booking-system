const router = require("express").Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  createScreen,
  getScreensByTheatre,
  updateScreen,
  deleteScreen,
} = require("../controllers/screenController");

// All routes require authentication + theatreOwner or admin role
router.use(protect);
router.use(authorize("theatreOwner", "admin"));

router.post("/", createScreen);
router.get("/theatre/:theatreId", getScreensByTheatre);
router.put("/:id", updateScreen);
router.delete("/:id", deleteScreen);

module.exports = router;