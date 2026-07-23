const express = require("express");
const { runCode, submitCode, listMySubmissions } = require("../controllers/submissionController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/run", requireAuth, runCode);
router.post("/submit", requireAuth, submitCode);
router.get("/mine", requireAuth, listMySubmissions);

module.exports = router;
