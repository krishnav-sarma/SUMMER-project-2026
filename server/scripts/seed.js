require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Problem = require("../models/Problem");
const User = require("../models/User");

const sampleProblems = [
  {
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays",
    tags: ["Hash Map"],
    companies: ["Google", "Amazon"],
    description:
      "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.\n\nYou may assume each input has exactly one solution, and you may not use the same element twice.",
    examples: [{ input: "nums = [2,7,11,15], target = 9", output: "[0,1]" }],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
    starterCode: {
      javascript:
        "const readline = require('readline').createInterface({ input: process.stdin });\nlet lines = [];\nreadline.on('line', l => lines.push(l));\nreadline.on('close', () => {\n  // parse lines, compute answer, console.log(JSON.stringify(answer))\n});",
      python: "import sys\ndata = sys.stdin.read().split()\n# parse, compute, print(answer)",
      cpp: "#include <iostream>\nint main() {\n    // read input, compute, print output\n}",
      java: "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        // read input, compute, print output\n    }\n}",
    },
    testCases: [
      { input: "[2,7,11,15]\n9", expected: "[0,1]" },
      { input: "[3,2,4]\n6", expected: "[1,2]" },
      { input: "[3,3]\n6", expected: "[0,1]", hidden: true },
    ],
    hints: [
      "A brute-force pair check works but is O(n^2). Can you do better?",
      "What do you need to remember about numbers you've already seen?",
      "A hash map from value to index gives O(1) lookups for the complement.",
    ],
    editorial: {
      approach: "Single-pass hash map",
      complexity: "Time: O(n) · Space: O(n)",
      explanation:
        "Walk the array once, checking for each number's complement in a hash map built as you go, and return as soon as a match is found.",
    },
  },
  {
    title: "Climbing Stairs",
    difficulty: "Easy",
    topic: "Dynamic Programming",
    tags: ["DP", "Recursion"],
    companies: ["Adobe"],
    description:
      "You are climbing a staircase with n steps. Each time you can climb 1 or 2 steps. In how many distinct ways can you reach the top?",
    examples: [{ input: "n = 3", output: "3" }],
    constraints: ["1 <= n <= 45"],
    starterCode: {
      javascript: "// read n from stdin, print the number of ways",
      python: "# read n from stdin, print the number of ways",
      cpp: "// read n from stdin, print the number of ways",
      java: "// read n from stdin, print the number of ways",
    },
    testCases: [
      { input: "2", expected: "2" },
      { input: "3", expected: "3" },
      { input: "5", expected: "8", hidden: true },
    ],
    hints: [
      "This is closely related to a well-known integer sequence.",
      "Ways to reach step n depend on ways to reach the two steps before it.",
    ],
    editorial: {
      approach: "Bottom-up DP (Fibonacci relation)",
      complexity: "Time: O(n) · Space: O(1)",
      explanation: "Track only the previous two values as you iterate from step 1 to n.",
    },
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected — seeding...");

  await Problem.deleteMany({});
  await Problem.insertMany(sampleProblems);
  console.log(`Inserted ${sampleProblems.length} problems.`);

  const adminEmail = "admin@example.com";
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("changeme123", 10);
    await User.create({
      name: "Admin",
      email: adminEmail,
      passwordHash,
      role: "admin",
    });
    console.log(`Created admin user: ${adminEmail} / changeme123 (change this password!)`);
  }

  console.log("Seed complete.");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
