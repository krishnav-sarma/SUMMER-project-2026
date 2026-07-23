const axios = require("axios");

const LANGUAGE_MAP = {
  javascript: {
    language: "javascript",
    version: "18.15.0",
  },

  python: {
    language: "python",
    version: "3.10.0",
  },

  java: {
    language: "java",
    version: "15.0.2",
  },

  cpp: {
    language: "c++",
    version: "10.2.0",
  },

  c: {
    language: "c",
    version: "10.2.0",
  },
};

const PISTON_URL =
  process.env.PISTON_URL || "https://emkc.org/api/v2/piston/execute";

async function runOnJudge0({ code, language, stdin }) {
  const lang = LANGUAGE_MAP[language];

  if (!lang) {
    throw new Error(`Unsupported language: ${language}`);
  }

  const { data } = await axios.post(PISTON_URL, {
    language: lang.language,
    version: lang.version,

    files: [
      {
        content: code,
      },
    ],

    stdin: stdin || "",
  });

  return {
    stdout: data.run.stdout,
    stderr: data.run.stderr,
    status: data.run.code === 0 ? "Accepted" : "Runtime Error",
    timeMs: null,
    memoryKb: null,
  };
}

module.exports = { runOnJudge0 };