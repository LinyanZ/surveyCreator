import { v4 as uuid } from "uuid";
import { useState } from "react";
import SubmitButton from "../components/common/submitButton";
import QuestionBase from "../components/questionTypes/questionBase";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import surveyTypes from "../surveyTypes";

function EditorBase({ question, handleChange }) {
  const { uuid, type } = question;
  return (
    <div className="w-full p-4">
      <div className="h-[1px] w-full bg-neutral-200" />
      <p className="text-2xl font-bold mt-4">Property Editor</p>
      <label htmlFor={`${uuid}.title`} className="hidden">
        Question Title
      </label>
      <input
        className="text-2xl w-full py-2 my-2 focus:outline-none border-b-2 border-transparent focus:border-neutral-200"
        type="text"
        placeholder="Enter Question Title Here"
        name={`${uuid}.title`}
        id={`${uuid}.title`}
        value={question.title}
        onChange={(e) => {
          handleChange(uuid, {
            ...question,
            title: e.target.value,
          });
        }}
      />
      <select
        className="text-xl w-full"
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
  );
}

function ResizeablePanel({ children, ...props }) {
  const [ref, { height }] = useMeasure();

  return (
    <motion.div
      animate={{
        height: height || "auto",
        // transition: { duration: 0.15, ease: "easeOut" },
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
              className="cursor-pointer py-4 px-4"
            >
              <QuestionBase
                className="w-full"
                question={q}
                index={index + 1}
                showIndex={survey.showIndex}
                handleChange={null}
              />
              <AnimatePresence>
                {selected && selected === q.uuid && (
                  <motion.div
                    className="overflow-hidden"
                    key={`${q.uuid} editor`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
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
