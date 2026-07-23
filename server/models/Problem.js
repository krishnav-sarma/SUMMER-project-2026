const mongoose = require("mongoose");

const exampleSchema = new mongoose.Schema(
  {
    input: String,
    output: String,
    explanation: String,
  },
  { _id: false }
);

const testCaseSchema = new mongoose.Schema(
  {
    input: { type: String, required: true },
    expected: { type: String, required: true },
    // hidden test cases are used for Submit but not shown to the user in Run
    hidden: { type: Boolean, default: false },
  },
  { _id: false }
);

const problemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    topic: { type: String, required: true },
    tags: [{ type: String }],
    companies: [{ type: String }],

    description: { type: String, required: true },
    examples: [exampleSchema],
    constraints: [{ type: String }],

    starterCode: {
      javascript: String,
      python: String,
      cpp: String,
      java: String,
    },

    testCases: [testCaseSchema],
    hints: [{ type: String }],
    editorial: {
      approach: String,
      complexity: String,
      explanation: String,
    },

    acceptanceCount: { type: Number, default: 0 },
    submissionCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// acceptance rate is derived, not stored directly, to avoid drift
problemSchema.virtual("acceptance").get(function () {
  if (!this.submissionCount) return 0;
  return Math.round((this.acceptanceCount / this.submissionCount) * 100);
});
problemSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Problem", problemSchema);
