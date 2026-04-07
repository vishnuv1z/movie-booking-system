const router = require("express").Router();
const { createScreen } = require("../controllers/screenController");

router.post("/", createScreen);

module.exports = router;