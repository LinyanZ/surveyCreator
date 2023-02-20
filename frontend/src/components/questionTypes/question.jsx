import React, { useEffect, useState } from "react";
import ShortAnswerQuestion from "./shortAnswerQuestion";
import SingleChoiceQuestion from "./singleChoiceQuestion";
import MultipleChoicesQuestion from "./multipleChoicesQuestion";
import DropDownListQuestion from "./dropDownListQuestion";
import RatingQuestion from "./ratingQuestion";

import { SurveyTypes } from "../../surveyTypes";

export default function Question({
  question,
  index,
  error,
  showIndex,
  handleChange,
  ...props
}) {
  const [title, setTitle] = useState();

  useEffect(() => {
    let formattedTitle = "";
    if (showIndex) formattedTitle += `${index}. `;

    formattedTitle += question.title ? question.title : "Empty Question Title";

    if (question.isRequired) formattedTitle += "*";
    setTitle(formattedTitle);
  }, [question, index]);

  const questionTypeSwitch = () => {
    let component;
    switch (question.type) {
      case SurveyTypes.ShortAnswer:
        component = <ShortAnswerQuestion />;
        break;
      case SurveyTypes.MultipleChoice:
        component = <SingleChoiceQuestion />;
        break;
      case SurveyTypes.MultipleAnswer:
        component = <MultipleChoicesQuestion />;
        break;
      case SurveyTypes.DropdownList:
        component = <DropDownListQuestion />;
        break;
      case SurveyTypes.Rating:
        component = <RatingQuestion />;
        break;
    }
    return React.cloneElement(component, {
      question,
      handleChange,
    });
  };

  return (
    <div {...props}>
      <h3 className="w-full py-2 mt-2 text-xl font-bold sm:text-2xl">
        {title}
      </h3>
      {questionTypeSwitch()}
      {error && <p className="mt-2 text-red-500 text-red text-xl">{error}</p>}
    </div>
  );
}
