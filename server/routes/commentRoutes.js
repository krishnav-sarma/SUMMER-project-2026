const express = require("express");
const { listComments, createComment } = require("../controllers/commentController");
const { requireAuth } = require("../middleware/auth");

// mergeParams lets this router read :problemId from the parent mount path
const router = express.Router({ mergeParams: true });

router.get("/", listComments);
router.post("/", requireAuth, createComment);

module.exports = router;
