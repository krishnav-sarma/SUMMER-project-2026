const express = require("express");
const { revealHint } = require("../controllers/hintController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/reveal", requireAuth, revealHint);

module.exports = router;
