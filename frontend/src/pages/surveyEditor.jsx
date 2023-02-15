import { v4 as uuid } from "uuid";
import { useState } from "react";
import SubmitButton from "../components/common/submitButton";
import QuestionBase from "../components/questionTypes/questionBase";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import surveyTypes from "../surveyTypes";
import RatingQuestionEditor from "../components/editorTypes/ratingQuestionEditor";
import Input from "../components/common/input";

function EditorBase({ question, handleChange }) {
  const { uuid, type } = question;

  const editorTypeSwitch = (type) => {
    switch (type) {
      case surveyTypes[4].type:
        return <RatingQuestionEditor question={question} />;
      case surveyTypes[1].type:
      case surveyTypes[2].type:
      case surveyTypes[3].type:
        return <div>options</div>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <p className="text-2xl font-bold my-4">Properties</p>
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
      <div className="flex text-xl gap-x-8 py-2 mt-4 flex-wrap">
        <label className="min-w-[200px]" htmlFor={`${uuid}.type`}>
          Question Type
        </label>
        <select
          className="flex-grow"
          name={`${uuid}.title`}
          defaultValue="short answer"
          onChange={(e) => {
            handleChange(uuid, {
              ...surveyTypes.find((t) => t.type === e.target.value).default,
              type: e.target.value,
              title: question.title,
              uuid: question.uuid,
              isRequired: question.isRequired,
            });
          }}
        >
          {surveyTypes.map((t, i) => (
            <option key={`${question.uuid} editor ${t.type}`} value={t.type}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
      {editorTypeSwitch(type)}
    </div>
  );
}

function ResizeablePanel({ children, ...props }) {
  const [ref, { height }] = useMeasure();

  return (
    <motion.div
      animate={{
        height: height || "auto",
        transition: { duration: 0.2 },
      }}
      {...props}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
}

export default function SurveyEditor() {
  const [survey, setSurvey] = useState({
    title: "",
    description: "",
    showIndex: true,
    questions: [
      {
        title: "",
        type: "short answer",
        uuid: uuid(),
        isRequired: false,
      },
      {
        title: "",
        type: "short answer",
        uuid: uuid(),
        isRequired: false,
      },
      {
        title: "",
        type: "short answer",
        uuid: uuid(),
        isRequired: false,
      },
    ],
  });
  const [selected, setSelected] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(survey);
  };

  const handleChange = (uuid, update) => {
    const questions = [...survey.questions];
    const i = questions.findIndex((q) => q.uuid === uuid);
    questions[i] = update;
    setSurvey((s) => ({ ...s, questions }));
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto p-8 my-8">
      <form>
        <label htmlFor="surveyTitle" className="hidden">
          Survey Title
        </label>
        <input
          className="text-4xl font-bold w-full py-2 focus:outline-none border-b-2 border-transparent focus:border-neutral-200"
          type="text"
          placeholder="Enter Survey Title Here"
          name="surveyTitle"
          id="surveyTitle"
          value={survey.title}
          onChange={(e) => setSurvey((s) => ({ ...s, title: e.target.value }))}
        />
        <label htmlFor="surveyDescription" className="hidden">
          Survey Description
        </label>
        <input
          className="text-2xl w-full py-2 focus:outline-none border-b-2 border-transparent focus:border-neutral-200"
          type="text"
          placeholder="Enter Survey Description Here"
          name="surveyDescription"
          id="surveyDescription"
          value={survey.description}
          onChange={(e) =>
            setSurvey((s) => ({ ...s, description: e.target.value }))
          }
        />
        <div className="h-[1px] w-full bg-neutral-200 my-8" />
        {survey.questions.map((q, index) => (
          <ResizeablePanel
            key={q.uuid}
            className={`overflow-hidden rounded-xl my-8 transition hover:shadow-[0px_0px_20px_2px_rgba(0,0,0,0.05)] ${
              selected && selected === q.uuid
                ? "shadow-[0px_0px_20px_2px_rgba(0,0,0,0.05)]"
                : ""
            }`}
          >
            <div
              onClick={() => setSelected(q.uuid)}
              className="cursor-pointer py-8 px-8"
            >
              <p className="text-2xl font-bold mb-4">Question Preview</p>
              <div className="p-2 px-4 border rounded-xl">
                <QuestionBase
                  className="w-full"
                  question={q}
                  index={index + 1}
                  showIndex={survey.showIndex}
                  handleChange={null}
                />
              </div>
              <AnimatePresence>
                {selected && selected === q.uuid && (
                  <motion.div
                    className="overflow-hidden"
                    key={`${q.uuid} editor`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    // exit={{ opacity: 0, height: 0 }}
                  >
                    <EditorBase question={q} handleChange={handleChange} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ResizeablePanel>
        ))}
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      </form>
    </div>
  );
}
