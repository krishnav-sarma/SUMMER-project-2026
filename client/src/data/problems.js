// Mock data — replace with real API call once backend is wired (Phase: backend integration).
export const problems = [
  { id: 1, title: "Two Sum", difficulty: "Easy", topic: "Arrays", tags: ["Hash Map"], companies: ["Google", "Amazon"], solved: true, acceptance: 49 },
  { id: 2, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topic: "Strings", tags: ["Sliding Window", "Hash Map"], companies: ["Amazon", "Adobe"], solved: false, acceptance: 34 },
  { id: 3, title: "Median of Two Sorted Arrays", difficulty: "Hard", topic: "Arrays", tags: ["Binary Search"], companies: ["Google"], solved: false, acceptance: 36 },
  { id: 4, title: "Merge Intervals", difficulty: "Medium", topic: "Arrays", tags: ["Sorting"], companies: ["Facebook", "Amazon"], solved: true, acceptance: 45 },
  { id: 5, title: "Climbing Stairs", difficulty: "Easy", topic: "Dynamic Programming", tags: ["DP", "Recursion"], companies: ["Adobe"], solved: true, acceptance: 51 },
  { id: 6, title: "Coin Change", difficulty: "Medium", topic: "Dynamic Programming", tags: ["DP"], companies: ["Google", "Uber"], solved: false, acceptance: 40 },
  { id: 7, title: "Longest Increasing Subsequence", difficulty: "Medium", topic: "Dynamic Programming", tags: ["DP", "Binary Search"], companies: ["Microsoft"], solved: false, acceptance: 47 },
  { id: 8, title: "Number of Islands", difficulty: "Medium", topic: "Graphs", tags: ["BFS", "DFS"], companies: ["Amazon", "Facebook"], solved: false, acceptance: 55 },
  { id: 9, title: "Course Schedule", difficulty: "Medium", topic: "Graphs", tags: ["Topological Sort"], companies: ["Google"], solved: false, acceptance: 46 },
  { id: 10, title: "Clone Graph", difficulty: "Medium", topic: "Graphs", tags: ["DFS", "BFS"], companies: ["Facebook"], solved: false, acceptance: 50 },
  { id: 11, title: "Binary Tree Level Order Traversal", difficulty: "Medium", topic: "Trees", tags: ["BFS"], companies: ["Amazon"], solved: true, acceptance: 62 },
  { id: 12, title: "Validate Binary Search Tree", difficulty: "Medium", topic: "Trees", tags: ["DFS"], companies: ["Adobe", "Microsoft"], solved: false, acceptance: 30 },
  { id: 13, title: "Lowest Common Ancestor of a BST", difficulty: "Easy", topic: "Trees", tags: ["DFS"], companies: ["Facebook"], solved: false, acceptance: 58 },
  { id: 14, title: "Reverse Linked List", difficulty: "Easy", topic: "Linked List", tags: ["Iteration"], companies: ["Amazon", "Google"], solved: true, acceptance: 70 },
  { id: 15, title: "Merge K Sorted Lists", difficulty: "Hard", topic: "Linked List", tags: ["Heap", "Divide & Conquer"], companies: ["Google", "Uber"], solved: false, acceptance: 47 },
  { id: 16, title: "Word Break", difficulty: "Medium", topic: "Dynamic Programming", tags: ["DP", "Trie"], companies: ["Amazon"], solved: false, acceptance: 45 },
  { id: 17, title: "Trapping Rain Water", difficulty: "Hard", topic: "Arrays", tags: ["Two Pointers", "Stack"], companies: ["Google", "Amazon"], solved: false, acceptance: 58 },
  { id: 18, title: "Valid Parentheses", difficulty: "Easy", topic: "Strings", tags: ["Stack"], companies: ["Microsoft"], solved: true, acceptance: 41 },
  { id: 19, title: "Kth Largest Element in an Array", difficulty: "Medium", topic: "Arrays", tags: ["Heap", "Quickselect"], companies: ["Facebook"], solved: false, acceptance: 65 },
  { id: 20, title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", topic: "Trees", tags: ["DFS", "Design"], companies: ["Google"], solved: false, acceptance: 55 },
];

// Extra detail for the problem-detail page. Keyed by id, merged onto the base list.
// Only a few problems have full detail wired up for the Phase 3 demo;
// the rest fall back to a generic placeholder in getProblemDetail().
const detail = {
  1: {
    description:
      "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`.\n\nYou may assume each input has exactly one solution, and you may not use the same element twice. Return the answer in any order.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] == 9, so return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "Only one valid answer exists."],
    starterCode: {
      javascript: "function twoSum(nums, target) {\n  // your code here\n}",
      python: "def two_sum(nums, target):\n    # your code here\n    pass",
      cpp: "vector<int> twoSum(vector<int>& nums, int target) {\n    // your code here\n}",
      java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // your code here\n    }\n}",
    },
    testCases: [
      { input: "[2,7,11,15], 9", expected: "[0,1]" },
      { input: "[3,2,4], 6", expected: "[1,2]" },
      { input: "[3,3], 6", expected: "[0,1]" },
    ],
    hints: [
      "A brute-force check of every pair works, but is O(n^2). Can you do better?",
      "As you scan the array, what do you need to remember about numbers you've already seen?",
      "A hash map from value → index lets you check for the complement in O(1).",
    ],
  },
  5: {
    description:
      "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      { input: "n = 2", output: "2", explanation: "1+1 step, or 2 steps." },
      { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, or 2+1." },
    ],
    constraints: ["1 <= n <= 45"],
    starterCode: {
      javascript: "function climbStairs(n) {\n  // your code here\n}",
      python: "def climb_stairs(n):\n    # your code here\n    pass",
      cpp: "int climbStairs(int n) {\n    // your code here\n}",
      java: "class Solution {\n    public int climbStairs(int n) {\n        // your code here\n    }\n}",
    },
    testCases: [
      { input: "2", expected: "2" },
      { input: "3", expected: "3" },
      { input: "5", expected: "8" },
    ],
    hints: [
      "This is closely related to a well-known integer sequence.",
      "The number of ways to reach step n is a function of the ways to reach the two steps before it.",
      "You don't need to store every step's count — only the last two.",
    ],
  },
};

export function getProblemDetail(id) {
  const base = problems.find((p) => p.id === Number(id));
  if (!base) return null;
  const extra = detail[Number(id)] || {
    description:
      "Full description not wired up for this demo problem yet — this is placeholder content so the editor and judge flow can still be tried.",
    examples: [{ input: "example input", output: "example output" }],
    constraints: ["Constraints not specified for this demo problem."],
    starterCode: {
      javascript: "function solve() {\n  // your code here\n}",
      python: "def solve():\n    # your code here\n    pass",
      cpp: "void solve() {\n    // your code here\n}",
      java: "class Solution {\n    void solve() {\n        // your code here\n    }\n}",
    },
    testCases: [{ input: "—", expected: "—" }],
    hints: ["No hints available for this demo problem yet."],
  };
  return { ...base, ...extra };
}

export const topics = [...new Set(problems.map((p) => p.topic))];
export const allTags = [...new Set(problems.flatMap((p) => p.tags))];
export const companies = [...new Set(problems.flatMap((p) => p.companies))];
