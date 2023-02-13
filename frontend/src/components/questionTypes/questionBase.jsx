import React from "react";
import ShortAnswerQuestion from "./shortAnswerQuestion";
import SingleChoiceQuestion from "./singleChoiceQuestion";
import MultipleChoicesQuestion from "./multipleChoicesQuestion";
import DropDownListQuestion from "./dropDownListQuestion";
import RatingQuestion from "./ratingQuestion";

export default function QuestionBase({
  question,
  index,
  error,
  showIndex,
  ...props
}) {
  const { title } = question;

  const questionTypeSwitch = () => {
    let component;
    switch (question.type) {
      case "short answer":
        component = <ShortAnswerQuestion />;
        break;
      case "single choice":
        component = <SingleChoiceQuestion />;
        break;
      case "multiple choices":
        component = <MultipleChoicesQuestion />;
        break;
      case "drop down":
        component = <DropDownListQuestion />;
        break;
      case "rating":
        component = <RatingQuestion />;
        break;
    }
    return React.cloneElement(component, {
      ...props,
      key: question.uuid,
      question: question,
    });
  };

  const generateTitle = () => {
    let formattedTitle = "";
    if (showIndex) formattedTitle += `${index}. `;

    formattedTitle += title;

    if (question.isRequired) formattedTitle += "*";
    return formattedTitle;
  };

  return (
    <form className="w-full my-8">
      <h3 className="text-2xl px-4 py-2 w-full font-bold">{generateTitle()}</h3>
      {questionTypeSwitch()}
      {error && <p className="text-red mx-4 mt-2 text-red-500">{error}</p>}
    </form>
  );
}
