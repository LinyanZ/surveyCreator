import { v4 as uuid } from "uuid";
import { useState } from "react";
import { motion } from "framer-motion";

import ResizeablePanel from "../components/common/resizeablePanel";
import QuestionBase from "../components/questionTypes/questionBase";
import EditorBase from "../components/editorTypes/editorBase";
import SubmitButton from "../components/common/submitButton";
import Input from "../components/common/input";

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
    <div className="w-full max-w-screen-lg p-8 mx-auto my-8">
      <form>
        <Input
          inputStyle="text-4xl font-bold w-full py-2 focus:outline-none border-b-2 border-transparent focus:border-neutral-200"
          name="surveyTitle"
          type="text"
          label="Survey Title"
          placeholder="Enter Survey Title Here"
          value={survey.title}
          onChange={(e) => setSurvey((s) => ({ ...s, title: e.target.value }))}
        />
        <Input
          inputStyle="text-2xl w-full py-2 focus:outline-none border-b-2 border-transparent focus:border-neutral-200"
          name="surveyDescription"
          type="text"
          label="Survey Description"
          placeholder="Enter Survey Description Here"
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
              className="px-8 py-8 cursor-pointer"
            >
              <p className="mb-4 text-2xl font-bold">Question Preview</p>
              <div className="p-2 px-4 border rounded-xl">
                <QuestionBase
                  className="w-full"
                  question={q}
                  index={index + 1}
                  showIndex={survey.showIndex}
                  handleChange={null}
                />
              </div>
              {selected && selected === q.uuid && (
                <motion.div
                  className="overflow-hidden"
                  key={`${q.uuid} editor`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <EditorBase question={q} handleChange={handleChange} />
                </motion.div>
              )}
            </div>
          </ResizeablePanel>
        ))}
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      </form>
    </div>
  );
}
