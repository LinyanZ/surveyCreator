require("dotenv").config();
const cors = require("cors");

// use the whitelist from the environment variable if present
// otherwise, allow all connections (*)
const whitelist = process.env.CORS_WHITELIST
  ? process.env.CORS_WHITELIST.split(" ")
  : "*";

module.exports = function (app) {
  app.use(
    cors({
      origin: whitelist,
      optionSuccessStatus: 200,
    })
  );
};
