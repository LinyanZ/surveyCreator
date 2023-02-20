const mongoose = require("mongoose");
const SurveyTypes = require("../misc/surveyType");
const Joi = require("joi");

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    default: SurveyTypes.ShortAnswer,
    enum: Object.values(SurveyTypes),
  },
  title: {
    type: String,
    required: true,
    minLength: 1,
  },
  isRequired: {
    type: Boolean,
    default: false,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    default: undefined,
  },
  minLabel: String,
  maxLabel: String,
  min: Number,
  max: Number,
  step: Number,
});

const surveySchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [questionSchema],
  showIndex: {
    type: Boolean,
    default: true,
    required: true,
  },
});

const Survey = mongoose.model("Survey", surveySchema);

const schema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": '"Survey title" is not allowed to be empty.',
  }),
  description: Joi.string().required().messages({
    "string.empty": '"Survey description" is not allowed to be empty.',
  }),
  showIndex: Joi.boolean().required(),
  questions: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required().messages({
          "string.empty": '"Question title" is not allowed to be empty.',
        }),
        _id: Joi.string().required(),
        isRequired: Joi.boolean().required(),
        type: Joi.string()
          .required()
          .valid(...Object.values(SurveyTypes)),
        options: Joi.when("type", {
          is: Joi.valid(SurveyTypes.ShortAnswer, SurveyTypes.Rating),
          then: Joi.forbidden(),
          otherwise: Joi.array()
            .items(
              Joi.string().messages({
                "string.empty": '"Option" is not allowed to be empty.',
              })
            )
            .required()
            .min(1)
            .messages({
              "array.min": "This question should contain at least one option.",
            }),
        }),
        minLabel: Joi.when("type", {
          is: Joi.valid(SurveyTypes.Rating),
          then: Joi.string().required().messages({
            "string.empty": '"Min label" is not allowed to be empty.',
          }),
          otherwise: Joi.forbidden(),
        }),
        maxLabel: Joi.when("type", {
          is: Joi.valid(SurveyTypes.Rating),
          then: Joi.string().required().messages({
            "string.empty": '"Max label" is not allowed to be empty.',
          }),
          otherwise: Joi.forbidden(),
        }),
        min: Joi.when("type", {
          is: Joi.valid(SurveyTypes.Rating),
          then: Joi.number()
            .required()
            .when("step", {
              is: Joi.number().positive(),
              then: Joi.number().less(Joi.ref("max")),
              otherwise: Joi.when("step", {
                is: Joi.number().negative(),
                then: Joi.number().greater(Joi.ref("max")),
              }),
            })
            .messages({
              "string.empty": '"Min" is required.',
              "number.less":
                '"Min" should be smaller than "Max" for a positive "Step" value',
              "number.greater":
                '"Min" should be greater than "Max" for a negative "Step" value',
            }),
          otherwise: Joi.forbidden(),
        }),
        max: Joi.when("type", {
          is: Joi.valid(SurveyTypes.Rating),
          then: Joi.number().required(),
          otherwise: Joi.forbidden(),
        }).messages({
          "string.empty": '"Max" is required.',
        }),
        step: Joi.when("type", {
          is: Joi.valid(SurveyTypes.Rating),
          then: Joi.number().required().invalid(0),
          otherwise: Joi.forbidden(),
        }).messages({
          "any.invalid": '"Step" value can not be 0.',
        }),
      })
    )
    .required()
    .min(1)
    .messages({
      "array.min": "This survey should contain at least one question.",
    }),
});

const validate = (survey) => {
  const options = { abortEarly: false };
  const { error } = schema.validate(survey, options);
  return error;
};

exports.Survey = Survey;
exports.validate = validate;
