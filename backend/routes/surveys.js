const express = require("express");
const router = express.Router();
const validateObjectId = require("../middlewares/validateObjectId");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const {
  getAllSurveys,
  getSurveyById,
  addSurvey,
} = require("../controllers/surveys");

router.get("/", (req, res) => getAllSurveys(req, res));
router.get("/:id", validateObjectId, (req, res) => getSurveyById(req, res));
router.post("/", [auth, admin], (req, res) => addSurvey(req, res));

module.exports = router;
