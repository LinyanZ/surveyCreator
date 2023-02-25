import { v4 as uuid } from "uuid";
import { useState } from "react";
import { motion } from "framer-motion";

import ResizeablePanel from "../components/common/resizeablePanel";
import Question from "../components/questionTypes/question";
import QuestionEditor from "../components/editorTypes/questionEditor";
import Input from "../components/common/input";
import Joi from "joi";
import { SurveyTypes } from "../surveyTypes";
import DraggableList from "../components/draggableList/draggableList";
import { addSurvey } from "../api/surveys";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const schema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": '"Survey title" is not allowed to be empty.',
  }),
  description: Joi.string().optional().messages({
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

const AddButton = ({ addQuestion }) => {
  return (
    <button
      type="button"
      onClick={addQuestion}
      className="my-16 block mx-auto w-16 h-16 rounded-xl text-2xl bg-emerald-500 text-white transition hover:bg-emerald-400"
    >
      +
    </button>
  );
};

const RemoveButton = ({ removeQuestion }) => {
  return (
    <div className="flex w-full justify-end">
      <button
        type="button"
        className="bg-red-500 text-white px-4 py-2 rounded-lg mt-8 transition hover:bg-red-400"
        onClick={removeQuestion}
      >
        Remove
      </button>
    </div>
  );
};

const SubmitButton = ({ handleSubmit, disabled }) => {
  return (
    <div className="flex w-full">
      <button
        className="flex-grow p-4 mx-8 text-2xl text-white transition-colors border rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-neutral-400"
        type="submit"
        onClick={handleSubmit}
        disabled={disabled}
      >
        Submit
      </button>
    </div>
  );
};

export default function SurveyEditor() {
  const [survey, setSurvey] = useState({
    title: "",
    description: "",
    showIndex: false,
    questions: [],
  });
  const [selected, setSelected] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = (newSurvey) => {
    const newErrors = {};

    const options = { abortEarly: false };
    const { error } = schema.validate(newSurvey, options);
    if (error) {
      error.details.forEach((e) => {
        if (e.path[0] === "questions" && e.path[1] !== undefined) {
          // update errors for each individual question
          newErrors[newSurvey.questions[e.path[1]]._id] = {
            ...newErrors[newSurvey.questions[e.path[1]]._id],
            [e.path[2]]: e.message,
          };
        } else {
          newErrors[e.path[0]] = e.message;
        }
      });
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate(survey);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      toast.promise(addSurvey(survey), {
        pending: "Uploading...",
        success: {
          render({ data }) {
            const sid = data.data._id;
            navigate(`/surveys/${sid}`);
            return "Survey Created!";
          },
        },
        error: {
          render({ data }) {
            return data.response.data;
          },
        },
      });
    }
  };

  const updateQuestions = (_id, update) => {
    const questions = [...survey.questions];
    const i = questions.findIndex((q) => q._id === _id);
    questions[i] = update;

    const newSurvey = { ...survey, questions };
    setErrors(validate(newSurvey));
    setSurvey(newSurvey);
  };

  const addQuestion = () => {
    const newSurvey = { ...survey };
    newSurvey.questions.push({
      type: SurveyTypes.ShortAnswer,
      title: "",
      isRequired: false,
      _id: uuid(),
    });
    setErrors(validate(newSurvey));
    setSurvey(newSurvey);
  };

  const removeQuestion = (_id) => {
    const newSurvey = { ...survey };
    newSurvey.questions = newSurvey.questions.filter((q) => q._id !== _id);
    setErrors(validate(newSurvey));
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
              setErrors(validate(newSurvey));
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
              setErrors(validate(newSurvey));
              setSurvey(newSurvey);
            }}
            error={errors.description}
            errorStyle="text-lg sm:text-xl text-red my-2 text-red-500"
          />
          <div className="h-[1px] w-full bg-neutral-200 my-8" />
        </div>
        <DraggableList
          items={survey.questions}
          setItems={(newQuestions) => {
            const newSurvey = { ...survey };
            newSurvey.questions = newQuestions;
            setSurvey(newSurvey);
          }}
          itemComponent={(q, i) => (
            <ResizeablePanel
              className={`overflow-hidden rounded-xl my-8 transition bg-white sm:hover:shadow-[0px_0px_20px_2px_rgba(0,0,0,0.05)] ${
                selected && selected === q._id
                  ? "shadow-[0px_0px_20px_2px_rgba(0,0,0,0.05)]"
                  : ""
              }`}
            >
              <div
                className="p-8 cursor-pointer"
                onClick={() => setSelected(q._id)}
              >
                <p
                  className={`mb-4 text-xl font-bold sm:text-2xl  ${
                    Object.keys(errors).includes(q._id) ? "text-red-400" : ""
                  }`}
                >
                  Question Preview
                </p>
                <div className="p-2 px-4 border rounded-xl">
                  <Question
                    className="w-full"
                    question={q}
                    index={i + 1}
                    showIndex={survey.showIndex}
                    handleChange={null}
                  />
                </div>
                {selected && selected === q._id && (
                  <motion.div
                    className="overflow-hidden"
                    key={`${q._id} editor`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <QuestionEditor
                      question={q}
                      handleChange={updateQuestions}
                      error={errors[q._id]}
                    />
                  </motion.div>
                )}
                <RemoveButton removeQuestion={() => removeQuestion(q._id)} />
              </div>
            </ResizeablePanel>
          )}
        ></DraggableList>
        {survey.questions.length === 0 && (
          <p className="text-3xl font-bold text-neutral-500 my-16 mx-auto w-fit">
            Add your first question here.
          </p>
        )}
        <AddButton addQuestion={addQuestion} />
        <SubmitButton
          handleSubmit={handleSubmit}
          disabled={Object.keys(errors).length !== 0}
        />
      </form>
    </div>
  );
}
