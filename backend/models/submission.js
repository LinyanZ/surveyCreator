const mongoose = require("mongoose");
const Joi = require("joi");

const responseSchema = new mongoose.Schema({
  qid: {
    type: String,
    required: true,
  },
  answer: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

const submissionSchema = new mongoose.Schema({
  sid: {
    type: mongoose.ObjectId,
  },
  responses: [responseSchema],
});

const Submission = mongoose.model("Submission", submissionSchema);

const surveySubmissionsSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
  questions: [
    new mongoose.Schema({
      qid: String,
      responses: [mongoose.Schema.Types.Mixed],
    }),
  ],
});

const SurveySubmissions = mongoose.model(
  "SurveySubmissions",
  surveySubmissionsSchema,
  "surveySubmissions"
);

const schema = Joi.array()
  .items(
    Joi.object({
      qid: Joi.string().required(),
      answer: Joi.alternatives().try(
        Joi.string(),
        Joi.number(),
        Joi.array().items(Joi.string())
      ),
    })
  )
  .required()
  .min(1)
  .messages({
    "array.min": "This submission should contain at least one response.",
  });

const validate = (survey) => {
  const options = { abortEarly: false };
  const { error } = schema.validate(survey, options);
  return error;
};

exports.Submission = Submission;
exports.SurveySubmissions = SurveySubmissions;
exports.validateSubmission = validate;
