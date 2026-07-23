const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    problems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }],
  },
  { timestamps: true }
);

// derived, not stored — recomputed on every read from start/end vs now
contestSchema.virtual("status").get(function () {
  const now = new Date();
  if (now < this.start) return "upcoming";
  if (now >= this.start && now <= this.end) return "live";
  return "ended";
});
contestSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Contest", contestSchema);
