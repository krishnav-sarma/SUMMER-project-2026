const express = require("express");
const {
  listContests,
  getContest,
  createContest,
  getContestLeaderboard,
} = require("../controllers/contestController");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", listContests);
router.get("/:id", getContest);
router.get("/:id/leaderboard", getContestLeaderboard);
router.post("/", requireAuth, requireAdmin, createContest);

module.exports = router;
