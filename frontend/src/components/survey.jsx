import React, { useState } from "react";
import Joi from "joi";

import SubmitButton from "./common/submitButton";
import QuestionBase from "./questionTypes/questionBase";

export default function Survey({ survey }) {
  const [submission, setSubmission] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (question, value) => {
    const newSubmission = submission.filter((s) => s.uuid !== question.uuid);
    newSubmission.push({
      uuid: question.uuid,
      answer: value,
    });
    validate(newSubmission, question.uuid);
    setSubmission(newSubmission);
  };

  const answerSchema = Joi.alternatives().try(
    Joi.string().required(),
    Joi.array().required().min(1),
    Joi.number().required()
  );

  // check if the answer is empty when a question is marked as required
  const validate = (s, uuid = null) => {
    const newErrors = { ...errors };

    for (const question of survey.questions) {
      if (question.isRequired && (!uuid || uuid === question.uuid)) {
        const answer = s.find((q) => q.uuid === question.uuid)?.answer;
        const { error } = answerSchema.validate(answer);

        if (!answer || error) {
          newErrors[question.uuid] =
            "This question is required to be answered.";
        } else {
          delete newErrors[question.uuid];
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(submission)) {
      console.log(submission);
    }
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto p-8 my-8">
      <h1 className="text-4xl font-bold w-full py-2">{survey.title}</h1>
      <h2 className="text-2xl w-full py-2">{survey.description}</h2>
      <div className="h-[1px] w-full bg-neutral-200 my-8" />
      {survey.questions.map((q, index) => (
        <QuestionBase
          key={q.uuid}
          className="w-full my-8"
          question={q}
          index={index + 1}
          showIndex={survey.showIndex}
          handleChange={handleChange}
          error={errors[q.uuid]}
        />
      ))}
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
    </div>
  );
}
