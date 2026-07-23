const express = require("express");
const {
  listProblems,
  getProblem,
  createProblem,
  updateProblem,
  deleteProblem,
} = require("../controllers/problemController");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", listProblems);
router.get("/:id", getProblem);

router.post("/", requireAuth, requireAdmin, createProblem);
router.put("/:id", requireAuth, requireAdmin, updateProblem);
router.delete("/:id", requireAuth, requireAdmin, deleteProblem);

module.exports = router;
