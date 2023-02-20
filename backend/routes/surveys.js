const express = require("express");
const router = express.Router();
const validateObjectId = require("../middlewares/validateObjectId");
const {
  getAllSurveys,
  getSurveyById,
  addSurvey,
} = require("../controllers/surveys");

router.get("/", (req, res) => getAllSurveys(req, res));
router.get("/:id", validateObjectId, (req, res) => getSurveyById(req, res));
router.post("/", (req, res) => addSurvey(req, res));

module.exports = router;
