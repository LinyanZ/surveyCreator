const mongoose = require("mongoose");

module.exports = function (req, res, next) {
  // check if the ":id" in the url params is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("Invalid ID.");

  next();
};
