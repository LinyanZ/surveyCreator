const { Survey, validate } = require("../models/survey");
const {
  Submission,
  validateSubmission,
  SurveySubmissions,
} = require("../models/submission");

const getAllSurveys = async (req, res) => {
  const results = await Survey.find();
  return res.send(results);
};

const getSurveyById = async (req, res) => {
  const result = await Survey.find({ _id: req.params.id });
  return res.send(result[0]);
};

const getSurveySubmissionsById = async (req, res) => {
  const submissions = await SurveySubmissions.findOne({ _id: req.params.id });
  if (!submissions) return res.status(400).send("Survey does not exist.");

  return res.send(submissions);
};

const postSurveySubmissionsById = async (req, res) => {
  const error = validateSubmission(req.body);
  if (error) return res.status(400).send(error.details.map((d) => d.message));

  const survey = await Survey.findOne({ _id: req.params.id });
  if (!survey) return res.status(400).send("Survey does not exist.");

  const submission = new Submission({
    sid: req.params.id,
    responses: req.body,
  });
  const result = await submission.save();
  return res.send(result);
};

const addSurvey = async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).send(error.details.map((d) => d.message));

  const survey = new Survey(req.body);
  const result = await survey.save();
  return res.send(result);
};

module.exports = {
  getAllSurveys,
  getSurveyById,
  getSurveySubmissionsById,
  postSurveySubmissionsById,
  addSurvey,
};
