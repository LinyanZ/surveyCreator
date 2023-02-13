import ShortAnswerQuestion from "./questionTypes/shortAnswerQuestion";
import SingleChoiceQuestion from "./questionTypes/singleChoiceQuestion";
import MultipleChoicesQuestion from "./questionTypes/multipleChoicesQuestion";
import DropDownListQuestion from "./questionTypes/dropDownListQuestion";
import RatingQuestion from "./questionTypes/ratingQuestion";
import { useState } from "react";
import SubmitButton from "./common/submitButton";

export default function Survey({ survey, showIndex }) {
  const [submission, setSubmission] = useState({});

  const handleChange = (uuid, value) => {
    setSubmission((s) => ({ ...s, [uuid]: value }));
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto p-8">
      <input
        className="text-4xl font-bold w-full py-2 px-4 focus:outline-none border-b-2 border-transparent focus:border-neutral-200"
        type="text"
        placeholder="Survey Title"
      />
      <input
        className="text-2xl w-full py-2 px-4 focus:outline-none border-b-2 border-transparent focus:border-neutral-200"
        type="text"
        placeholder="Survey Description"
      />
      <div className="h-[1px] w-full bg-neutral-200 my-8" />
      {survey.map((question, index) => {
        switch (question.type) {
          case "short answer":
            return (
              <ShortAnswerQuestion
                key={question.uuid}
                question={question}
                index={index + 1}
                showIndex={showIndex}
                onChange={handleChange}
              />
            );
          case "single choice":
            return (
              <SingleChoiceQuestion
                key={question.uuid}
                question={question}
                index={index + 1}
                showIndex={showIndex}
                onChange={handleChange}
              />
            );
          case "multiple choices":
            return (
              <MultipleChoicesQuestion
                key={question.uuid}
                question={question}
                index={index + 1}
                showIndex={showIndex}
                onChange={handleChange}
              />
            );
          case "drop down":
            return (
              <DropDownListQuestion
                key={question.uuid}
                question={question}
                index={index + 1}
                showIndex={showIndex}
                onChange={handleChange}
              />
            );
          case "rating":
            return (
              <RatingQuestion
                key={question.uuid}
                question={question}
                index={index + 1}
                showIndex={showIndex}
                onChange={handleChange}
              />
            );
        }
      })}
      <SubmitButton onClick={() => console.log(submission)}>
        Submit
      </SubmitButton>
    </div>
  );
}
