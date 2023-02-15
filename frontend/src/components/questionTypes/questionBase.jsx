import React from "react";
import ShortAnswerQuestion from "./shortAnswerQuestion";
import SingleChoiceQuestion from "./singleChoiceQuestion";
import MultipleChoicesQuestion from "./multipleChoicesQuestion";
import DropDownListQuestion from "./dropDownListQuestion";
import RatingQuestion from "./ratingQuestion";

import surveyTypes from "../../surveyTypes";

export default function QuestionBase({
  question,
  index,
  error,
  showIndex,
  handleChange,
  ...props
}) {
  const { title } = question;

  const questionTypeSwitch = () => {
    let component;
    switch (question.type) {
      case surveyTypes[0].type:
        component = <ShortAnswerQuestion />;
        break;
      case surveyTypes[1].type:
        component = <SingleChoiceQuestion />;
        break;
      case surveyTypes[2].type:
        component = <MultipleChoicesQuestion />;
        break;
      case surveyTypes[3].type:
        component = <DropDownListQuestion />;
        break;
      case surveyTypes[4].type:
        component = <RatingQuestion />;
        break;
    }
    return React.cloneElement(component, {
      question,
      handleChange,
    });
  };

  const generateTitle = () => {
    let formattedTitle = "";
    if (showIndex) formattedTitle += `${index}. `;

    formattedTitle += title ? title : "Empty Question Title";

    if (question.isRequired) formattedTitle += "*";
    return formattedTitle;
  };

  return (
    <div {...props}>
      <h3 className="text-2xl py-2 mt-2 w-full font-bold">{generateTitle()}</h3>
      {questionTypeSwitch()}
      {error && <p className="text-red mt-2 text-red-500">{error}</p>}
    </div>
  );
}
