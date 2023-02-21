const express = require("express");
const cookieParser = require("cookie-parser");
const error = require("../middlewares/error");
const surveys = require("../routes/surveys");
const users = require("../routes/users");

module.exports = function (app) {
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/surveys", surveys);
  app.use("/api/users", users);

  app.get("/", (req, res) => res.send("HOMEPAGE"));
  app.all("*", (req, res) => res.status(404).send("Page not found"));

  // this will catch all errors occured within the Express app
  // make sure this middleware is added after all other app.use() and routes calls
  app.use(error);
};
