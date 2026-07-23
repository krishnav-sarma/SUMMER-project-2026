const Comment = require("../models/Comment");

async function listComments(req, res, next) {
  try {
    const topLevel = await Comment.find({ problem: req.params.problemId, parentComment: null })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    const withReplies = await Promise.all(
      topLevel.map(async (comment) => {
        const replies = await Comment.find({ parentComment: comment._id })
          .populate("author", "name")
          .sort({ createdAt: 1 });
        return { ...comment.toObject(), replies };
      })
    );

    res.json({ comments: withReplies });
  } catch (err) {
    next(err);
  }
}

async function createComment(req, res, next) {
  try {
    const { text, parentComment } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ error: "Comment text is required." });

    const comment = await Comment.create({
      problem: req.params.problemId,
      author: req.user._id,
      text,
      parentComment: parentComment || null,
    });

    await comment.populate("author", "name");
    res.status(201).json({ comment });
  } catch (err) {
    next(err);
  }
}

module.exports = { listComments, createComment };
