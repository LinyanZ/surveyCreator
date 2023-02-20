const { Survey, validate } = require("../models/survey");

const getAllSurveys = async (req, res) => {
  const results = await Survey.find();
  return res.send(results);
};

const getSurveyById = async (req, res) => {
  const result = await Survey.find({ _id: req.params.id });
  return res.send(result[0]);
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
  addSurvey,
};
