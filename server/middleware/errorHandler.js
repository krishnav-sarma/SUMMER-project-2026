// Central error handler — keeps controllers free of repetitive try/catch boilerplate.
function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }
  if (err.code === 11000) {
    return res.status(409).json({ error: "A record with that value already exists." });
  }

  res.status(err.status || 500).json({ error: err.message || "Internal server error." });
}

module.exports = errorHandler;
