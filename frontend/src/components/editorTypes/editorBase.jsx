import RatingQuestionEditor from "./ratingQuestionEditor";
import surveyTypes from "../../surveyTypes";
import Input from "../common/input";
import OptionsEditor from "./optionsEditor";

export default function EditorBase({ question, handleChange }) {
  const { uuid, type } = question;

  const editorTypeSwitch = (type) => {
    switch (type) {
      case surveyTypes[4].type:
        return (
          <RatingQuestionEditor
            question={question}
            handleChange={handleChange}
          />
        );
      case surveyTypes[1].type:
      case surveyTypes[2].type:
      case surveyTypes[3].type:
        return (
          <OptionsEditor question={question} handleChange={handleChange} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <p className="my-4 text-2xl font-bold">Properties</p>
      <Input
        name={`${uuid}.title`}
        label="Enter Question Title Here"
        type="text"
        inputStyle="text-xl py-2 w-full focus:outline-none border-b-2 border-neutral-300 focus:border-neutral-600"
        value={question.title}
        onChange={(e) => {
          handleChange(uuid, {
            ...question,
            title: e.target.value,
          });
        }}
        error={
          question.title.trim() === ""
            ? "Question title is not allowed to be empty."
            : null
        }
        errorStyle="text-red my-2 text-red-500"
      />
      <div className="flex flex-wrap py-2 mt-4 text-xl gap-x-8">
        <label className="min-w-[200px] font-bold" htmlFor={`${uuid}.type`}>
          Question Type
        </label>
        <select
          className="flex-grow max-w-full"
          name={`${uuid}.title`}
          defaultValue="short answer"
          onChange={(e) => {
            const defaultQuestion = surveyTypes.find(
              (t) => t.type === e.target.value
            ).default;

            // spread the default values and other question properties
            const update = {
              // deep copy the default object
              ...JSON.parse(JSON.stringify(defaultQuestion)),
              type: e.target.value,
              title: question.title,
              uuid: question.uuid,
              isRequired: question.isRequired,
            };

            // keep the added options if possible
            if (question.options && update.options)
              update.options = [...question.options];

            handleChange(uuid, update);
          }}
        >
          {surveyTypes.map((t) => (
            <option
              className="w-full"
              key={`${question.uuid} editor ${t.type}`}
              value={t.type}
            >
              {t.label}
            </option>
          ))}
        </select>
      </div>
      {editorTypeSwitch(type)}
    </div>
  );
}