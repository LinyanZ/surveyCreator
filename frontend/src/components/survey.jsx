import React, { useState } from "react";
import Joi from "joi";

import SubmitButton from "./common/submitButton";
import QuestionBase from "./questionTypes/questionBase";

export default function Survey({ survey, showIndex }) {
  const [submission, setSubmission] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (question, value) => {
    const newSubmission = submission.filter((s) => s.uuid !== question.uuid);
    newSubmission.push({
      uuid: question.uuid,
      answer: value,
    });
    setSubmission(newSubmission);
    validate(newSubmission);
  };

  const answerSchema = Joi.alternatives().try(
    Joi.string().required(),
    Joi.array().required().min(1),
    Joi.number().required()
  );

  const validate = (s) => {
    const newErrors = {};
    for (const question of survey.questions) {
      // check if the answer is empty when a question is marked as required
      if (question.isRequired) {
        const answer = s.find((q) => q.uuid === question.uuid)?.answer;
        const { error } = answerSchema.validate(answer);
        if (!answer || error) {
          newErrors[question.uuid] =
            "This question is required to be answered.";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate(submission)) {
      console.log(submission);
    }
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto p-8 my-8">
      {/* <label htmlFor="surveyTitle" className="hidden">
        Survey Title
      </label>
      <input
        className="text-4xl font-bold w-full py-2 px-4 focus:outline-none border-b-2 border-transparent focus:border-neutral-200"
        type="text"
        placeholder="Survey Title"
        name="surveyTitle"
        id="surveyTitle"
      />
      <label htmlFor="surveyDescription" className="hidden">
        Survey Description
      </label>
      <input
        className="text-2xl w-full py-2 px-4 focus:outline-none border-b-2 border-transparent focus:border-neutral-200"
        type="text"
        placeholder="Survey Description"
        name="surveyDescription"
        id="surveyDescription"
      /> */}
      <h1 className="text-4xl font-bold w-full py-2 px-4">{survey.title}</h1>
      <h2 className="text-2xl w-full py-2 px-4">{survey.description}</h2>
      <div className="h-[1px] w-full bg-neutral-200 my-8" />
      {survey.questions.map((q, index) => (
        <QuestionBase
          key={q.uuid}
          question={q}
          index={index + 1}
          showIndex={showIndex}
          onChange={handleChange}
          error={errors[q.uuid]}
        />
      ))}
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
    </div>
  );
}
