import ShortAnswerQuestion from "./questionTypes/shortAnswerQuestion";
import SingleChoiceQuestion from "./questionTypes/singleChoiceQuestion";
import MultipleChoicesQuestion from "./questionTypes/multipleChoicesQuestion";
import DropDownListQuestion from "./questionTypes/dropDownListQuestion";
import RatingQuestion from "./questionTypes/ratingQuestion";

export default function Survey({ survey, showIndex }) {
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
                key={`${index} ${question.title}`}
                question={question}
                index={index + 1}
                showIndex={showIndex}
              />
            );
          case "single choice":
            return (
              <SingleChoiceQuestion
                key={`${index} ${question.title}`}
                question={question}
                index={index + 1}
                showIndex={showIndex}
              />
            );
          case "multiple choices":
            return (
              <MultipleChoicesQuestion
                key={`${index} ${question.title}`}
                question={question}
                index={index + 1}
                showIndex={showIndex}
              />
            );
          case "drop down":
            return (
              <DropDownListQuestion
                key={`${index} ${question.title}`}
                question={question}
                index={index + 1}
                showIndex={showIndex}
              />
            );
          case "rating":
            return (
              <RatingQuestion
                key={`${index} ${question.title}`}
                question={question}
                index={index + 1}
                showIndex={showIndex}
              />
            );
        }
      })}
    </div>
  );
}
