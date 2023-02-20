const winston = require("winston");
const { createLogger, format, transports } = winston;

const logger = createLogger({
  level: "info",
  format: format.combine(format.simple(), format.colorize()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
});

module.exports = logger;
