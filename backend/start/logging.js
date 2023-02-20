require("express-async-errors");
const logger = require("./logger");

module.exports = function () {
  // triggered when an Error is thrown
  process.on("uncaughtException", (ex) => {
    logger.error(ex.message, ex);
  });

  // triggered when a Promise is rejected
  process.on("unhandledRejection", (ex) => {
    throw ex; // simply throw this exception as an Error so that the above code will handle it
  });
};
