const logger = require("../start/logger");

module.exports = function (err, req, res, next) {
  logger.error(err.message, err);
  res.status(err.status || 500).send(err.message || "Something failed.");
};
