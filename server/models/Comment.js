const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    problem: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, trim: true },
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
