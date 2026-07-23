const mongoose = require("mongoose");

const hintRevealSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    problem: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
    hintIndex: { type: Number, required: true },
  },
  { timestamps: true }
);

hintRevealSchema.index({ user: 1, problem: 1, hintIndex: 1 }, { unique: true });

module.exports = mongoose.model("HintReveal", hintRevealSchema);
