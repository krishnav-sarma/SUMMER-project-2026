require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const problemRoutes = require("./routes/problemRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const hintRoutes = require("./routes/hintRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const userRoutes = require("./routes/userRoutes");
const contestRoutes = require("./routes/contestRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/hints", hintRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contests", contestRoutes);
app.use("/api/problems/:problemId/comments", commentRoutes);

app.use((req, res) => res.status(404).json({ error: "Route not found." }));
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

async function start() {
  await connectDB();
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

start();

module.exports = app;
