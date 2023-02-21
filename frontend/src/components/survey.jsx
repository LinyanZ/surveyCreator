import React, { useEffect, useState } from "react";
import Joi from "joi";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import Question from "./questionTypes/question";
import { getSurveyByID } from "../api/surveys";

export default function Survey() {
  const [submission, setSubmission] = useState([]);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const {
    isLoading,
    isSuccess,
    isError,
    data: response,
    error,
  } = useQuery(["survey", id], () => getSurveyByID(id));

  const survey = response?.data;

  const handleChange = (question, value) => {
    const newSubmission = submission.filter((s) => s._id !== question._id);
    newSubmission.push({
      _id: question._id,
      answer: value,
    });
    validate(newSubmission, question._id);
    setSubmission(newSubmission);
  };

  const answerSchema = Joi.alternatives().try(
    Joi.string().required(),
    Joi.array().required().min(1),
    Joi.number().required()
  );

  // check if the answer is empty when a question is marked as required
  const validate = (s, _id = null) => {
    const newErrors = { ...errors };

    for (const question of survey.questions) {
      if (question.isRequired && (!_id || _id === question._id)) {
        const answer = s.find((q) => q._id === question._id)?.answer;
        const { error } = answerSchema.validate(answer);

        if (!answer || error) {
          newErrors[question._id] = "This question is required to be answered.";
        } else {
          delete newErrors[question._id];
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
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>{error}</div>}
      {isSuccess && (
        <div className="w-full max-w-screen-lg mx-auto my-8 px-8">
          <h1 className="w-full py-2 text-4xl font-bold">{survey.title}</h1>
          <h2 className="w-full py-2 text-2xl">{survey.description}</h2>
          <div className="h-[1px] w-full bg-neutral-200 my-8" />
          {survey.questions.map((q, index) => (
            <Question
              key={q._id}
              className="w-full my-8"
              question={q}
              index={index + 1}
              showIndex={survey.showIndex}
              handleChange={handleChange}
              error={errors[q._id]}
            />
          ))}
          <button
            className="w-full p-4 text-2xl text-white transition-colors border rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-neutral-400"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
}
