const axios = require("axios");

// JDoodle language + versionIndex pairs. versionIndex picks which compiler
// version to use — JDoodle adds new ones over time, so double-check the
// current index for each language in your JDoodle dashboard if these start
// failing with a "language/version not supported" error.
const LANGUAGE_CONFIG = {
  javascript: { language: "nodejs", versionIndex: "4" },
  python: { language: "python3", versionIndex: "4" },
  cpp: { language: "cpp17", versionIndex: "0" },
  java: { language: "java", versionIndex: "4" },
};

const JDOODLE_URL = process.env.JDOODLE_URL || "https://api.jdoodle.com/v1/execute";
const CLIENT_ID = process.env.JDOODLE_CLIENT_ID;
const CLIENT_SECRET = process.env.JDOODLE_CLIENT_SECRET;

/**
 * Runs source code + stdin via JDoodle and returns { stdout, stderr, status }.
 * JDoodle responds synchronously — no polling needed, same as glot.io was.
 */
async function runOnJdoodle({ code, language, stdin }) {
  const config = LANGUAGE_CONFIG[language];
  if (!config) throw new Error(`Unsupported language: ${language}`);
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error("JDOODLE_CLIENT_ID / JDOODLE_CLIENT_SECRET not set in .env");
  }

  const { data } = await axios.post(JDOODLE_URL, {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    script: code,
    stdin: stdin || "",
    language: config.language,
    versionIndex: config.versionIndex,
  });

  // JDoodle returns statusCode 200 + an `error` field on compile/runtime failure,
  // rather than a separate stderr field for compile errors — both land in `output`.
  const failed = data.statusCode !== 200 || data.error;
  const status = failed ? "Error" : "Accepted";

  return {
    stdout: failed ? "" : data.output || "",
    stderr: failed ? data.output || data.error || "" : "",
    status,
    timeMs: data.cpuTime ? Math.round(parseFloat(data.cpuTime) * 1000) : null,
    memoryKb: data.memory ? Number(data.memory) : null,
  };
}

module.exports = { runOnJdoodle, LANGUAGE_CONFIG };
