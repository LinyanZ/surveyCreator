const mongoose = require("mongoose");
const logger = require("./logger");

// encode special characters such as '@'
// const username = encodeURIComponent(process.env.DBUSERNAME);
// const password = encodeURIComponent(process.env.DBPASSWORD);

const url = "mongodb://db:27017/surveyCreator";

module.exports = function () {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(url)
    .then(() =>
      logger.info(
        `Mongo connection started on ${mongoose.connection.host}:${mongoose.connection.port}`
      )
    );
  // errors are caught by ./logging.js, so there's no need for a catch statement
};
