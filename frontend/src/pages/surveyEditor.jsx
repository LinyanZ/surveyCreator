import { v4 as uuid } from "uuid";
import { useState } from "react";
import { motion } from "framer-motion";

import ResizeablePanel from "../components/common/resizeablePanel";
import Question from "../components/questionTypes/question";
import QuestionEditor from "../components/editorTypes/questionEditor";
import Input from "../components/common/input";
import Joi from "joi";
import surveyTypes from "../surveyTypes";

const schema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": '"Survey title" is not allowed to be empty.',
  }),
  description: Joi.string().optional().messages({
    "string.empty": '"Survey description" is not allowed to be empty.',
  }),
  showIndex: Joi.boolean().required(),
  questions: Joi.array().items(
    Joi.object({
      title: Joi.string().required().messages({
        "string.empty": '"Question title" is not allowed to be empty.',
      }),
      uuid: Joi.string().required(),
      isRequired: Joi.boolean().optional(),
      type: Joi.string()
        .required()
        .valid(...surveyTypes.map((s) => s.type)),
      options: Joi.when("type", {
        is: Joi.valid(surveyTypes[0].type, surveyTypes[4].type),
        then: Joi.forbidden(),
        otherwise: Joi.array()
          .items(
            Joi.string().required().messages({
              "string.empty": '"Option" is not allowed to be empty.',
            })
          )
          .required()
          .messages({
            "array.includesRequiredUnknowns":
              "This question should contain at least one option.",
          }),
      }),
      minLabel: Joi.when("type", {
        is: Joi.valid(surveyTypes[4].type),
        then: Joi.string().required().messages({
          "string.empty": '"Min label" is not allowed to be empty.',
        }),
        otherwise: Joi.forbidden(),
      }),
      maxLabel: Joi.when("type", {
        is: Joi.valid(surveyTypes[4].type),
        then: Joi.string().required().messages({
          "string.empty": '"Max label" is not allowed to be empty.',
        }),
        otherwise: Joi.forbidden(),
      }),
      min: Joi.when("type", {
        is: Joi.valid(surveyTypes[4].type),
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
        is: Joi.valid(surveyTypes[4].type),
        then: Joi.number().required(),
        otherwise: Joi.forbidden(),
      }).messages({
        "string.empty": '"Max" is required.',
      }),
      step: Joi.when("type", {
        is: Joi.valid(surveyTypes[4].type),
        then: Joi.number().required().invalid(0),
        otherwise: Joi.forbidden(),
      }).messages({
        "any.invalid": '"Step" value can not be 0.',
      }),
    })
  ),
});

export default function SurveyEditor() {
  const [survey, setSurvey] = useState({
    title: "",
    description: "",
    showIndex: true,
    questions: [
      {
        title: "",
        type: "short answer",
        uuid: uuid(),
        isRequired: false,
      },
      {
        title: "",
        type: "short answer",
        uuid: uuid(),
        isRequired: false,
      },
      {
        title: "",
        type: "short answer",
        uuid: uuid(),
        isRequired: false,
      },
    ],
  });
  const [selected, setSelected] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = (obj, schema) => {
    const newErrors = {};

    const options = { abortEarly: false };
    const { error } = schema.validate(obj, options);
    if (error) {
      error.details.forEach((e) => {
        if (e.path[0] === "questions") {
          console.log(e);
          newErrors[survey.questions[e.path[1]].uuid] = {
            ...newErrors[survey.questions[e.path[1]].uuid],
            [e.path[2]]: e.message,
          };
        } else {
          newErrors[e.path[0]] = e.message;
        }
      });
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(survey);
  };

  const updateQuestions = (uuid, update) => {
    const questions = [...survey.questions];
    const i = questions.findIndex((q) => q.uuid === uuid);
    questions[i] = update;

    const newSurvey = { ...survey, questions };
    setErrors(validate(newSurvey, schema));
    setSurvey(newSurvey);
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto my-8">
      <form>
        <div className="px-8">
          <Input
            inputStyle="text-2xl sm:text-4xl font-bold w-full box-border py-2 focus:outline-none border-b-2 border-transparent focus:border-neutral-200"
            name="surveyTitle"
            type="text"
            label="Survey Title"
            placeholder="Enter Survey Title Here"
            value={survey.title}
            onChange={(e) => {
              const newSurvey = { ...survey, title: e.target.value };
              setErrors(validate(newSurvey, schema));
              setSurvey(newSurvey);
            }}
            error={errors.title}
            errorStyle="text-lg sm:text-xl text-red my-2 text-red-500"
          />
          <Input
            inputStyle="text-xl sm:text-2xl w-full box-border py-2 focus:outline-none border-b-2 border-transparent focus:border-neutral-200"
            name="surveyDescription"
            type="text"
            label="Survey Description"
            placeholder="Enter Survey Description Here"
            value={survey.description}
            onChange={(e) => {
              const newSurvey = { ...survey, description: e.target.value };
              setErrors(validate(newSurvey, schema));
              setSurvey(newSurvey);
            }}
            error={errors.description}
            errorStyle="text-lg sm:text-xl text-red my-2 text-red-500"
          />
          <div className="h-[1px] w-full bg-neutral-200 my-8" />
        </div>
        {survey.questions.map((q, index) => (
          <ResizeablePanel
            key={q.uuid}
            className={`overflow-hidden rounded-xl my-8 transition sm:hover:shadow-[0px_0px_20px_2px_rgba(0,0,0,0.05)] ${
              selected && selected === q.uuid
                ? "shadow-[0px_0px_20px_2px_rgba(0,0,0,0.05)]"
                : ""
            }`}
          >
            <div
              onClick={() => setSelected(q.uuid)}
              className="p-8 cursor-pointer"
            >
              <p
                className={`mb-4 text-xl font-bold sm:text-2xl  ${
                  Object.keys(errors).includes(q.uuid) ? "text-red-400" : ""
                }`}
              >
                Question Preview
              </p>
              <div className="p-2 px-4 border rounded-xl">
                <Question
                  className="w-full"
                  question={q}
                  index={index + 1}
                  showIndex={survey.showIndex}
                  handleChange={null}
                />
              </div>
              {selected && selected === q.uuid && (
                <motion.div
                  className="overflow-hidden"
                  key={`${q.uuid} editor`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <QuestionEditor
                    question={q}
                    handleChange={updateQuestions}
                    error={errors[q.uuid]}
                  />
                </motion.div>
              )}
            </div>
          </ResizeablePanel>
        ))}
        <div className="flex w-full">
          <button
            className="flex-grow p-4 mx-8 text-2xl text-white transition-colors border rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-neutral-400"
            type="submit"
            onClick={handleSubmit}
            disabled={Object.keys(errors).length !== 0}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
