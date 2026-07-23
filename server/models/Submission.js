const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    problem: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },

    language: { type: String, required: true },
    code: { type: String, required: true },

    passed: { type: Boolean, required: true },
    runtimeMs: Number,
    memoryKb: Number,

    testResults: [
      {
        input: String,
        expected: String,
        actual: String,
        passed: Boolean,
      },
    ],

    // "run" = sample cases only, doesn't affect score; "submit" = full test suite, can update score/streak
    kind: { type: String, enum: ["run", "submit"], default: "submit" },
  },
  { timestamps: true }
);

submissionSchema.index({ user: 1, problem: 1 });

module.exports = mongoose.model("Submission", submissionSchema);
