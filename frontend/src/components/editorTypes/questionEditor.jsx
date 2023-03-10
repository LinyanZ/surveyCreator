import RatingQuestionEditor from "./ratingQuestionEditor";
import { SurveyTypes, defaultValues, labels } from "../../surveyTypes";
import Input from "../common/input";
import OptionsEditor from "./optionsEditor";

export default function QuestionEditor({ question, handleChange, error }) {
  const { _id, type } = question;

  const editorTypeSwitch = (type) => {
    switch (type) {
      case SurveyTypes.Rating:
        return (
          <RatingQuestionEditor
            question={question}
            handleChange={handleChange}
            error={error}
          />
        );
      case SurveyTypes.MultipleChoice:
      case SurveyTypes.MultipleAnswer:
      case SurveyTypes.DropdownList:
        return (
          <OptionsEditor
            question={question}
            handleChange={handleChange}
            error={error}
          />
        );
      default:
        return null;
    }
  };

  const switchType = (e) => {
    const defaultQuestion = defaultValues[e.target.value];

    // spread the default values and other question properties
    const update = {
      // deep copy the default object
      ...JSON.parse(JSON.stringify(defaultQuestion)),
      type: e.target.value,
      title: question.title,
      _id: question._id,
      isRequired: question.isRequired,
    };

    // keep the added options if possible
    if (question.options && update.options)
      update.options = [...question.options];

    handleChange(_id, update);
  };

  return (
    <div className="w-full">
      <p className="my-4 text-xl font-bold sm:text-2xl">Properties</p>
      <Input
        name={`${_id}.title`}
        label="Enter Question Title Here"
        type="text"
        inputStyle="text-lg sm:text-xl py-2 w-full focus:outline-none border-b-2 border-neutral-300 focus:border-neutral-600"
        value={question.title}
        onChange={(e) => {
          handleChange(_id, {
            ...question,
            title: e.target.value,
          });
        }}
        error={error?.title}
        errorStyle="text-lg sm:text-xl text-red my-2 text-red-500"
      />
      <div className="flex flex-wrap py-2 text-lg sm:text-xl gap-x-8">
        <label className="min-w-[200px] my-2 font-bold" htmlFor={`${_id}.type`}>
          Question Type
        </label>
        <select
          className="flex-grow my-2 max-w-full"
          name={`${_id}.title`}
          defaultValue={question.type}
          onChange={switchType}
        >
          {Object.values(SurveyTypes).map((t) => (
            <option
              className="w-full"
              key={`${question._id} editor ${t}`}
              value={t}
            >
              {labels[t]}
            </option>
          ))}
        </select>
      </div>
      <Input
        name="required"
        label="Mark as required"
        type="checkbox"
        labelStyle="text-lg sm:text-xl mr-4"
        value={question.isRequired}
        onChange={() => {
          handleChange(_id, {
            ...question,
            isRequired: !question.isRequired,
          });
        }}
      />

      {editorTypeSwitch(type)}
    </div>
  );
}
