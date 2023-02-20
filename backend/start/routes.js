const express = require("express");
const error = require("../middlewares/error");
const surveys = require("../routes/surveys");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/surveys", surveys);

  app.get("/", (req, res) => res.send("HOMEPAGE"));
  app.all("*", (req, res) => res.status(404).send("Page not found"));

  // this will catch all errors occured within the Express app
  // make sure this middleware is added after all other app.use() and routes calls
  app.use(error);
};
