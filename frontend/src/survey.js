import { v4 as uuid } from "uuid";

const survey = {
  title: "A Very Long Survey Title",
  description: "A Very Very Long Survey Description",
  questions: [
    {
      type: "short answer",
      title: "This is a short answer question:",
      _id: uuid(),
      isRequired: true,
    },
    {
      type: "multiple choices single answer",
      title: "This is a single choice question:",
      options: ["option 1", "option 2", "option 3"],
      _id: uuid(),
    },
    {
      type: "multiple choices multiple answers",
      title: "This is a multiple choices question:",
      options: ["option 1", "option 2", "option 3"],
      _id: uuid(),
    },
    {
      type: "drop-down list",
      title: "This is a drop down list question:",
      options: ["option 1", "option 2", "option 3"],
      _id: uuid(),
      isRequired: true,
    },
    {
      type: "rating",
      title: "This is a rating question:",
      minLabel: "Min",
      maxLabel: "Max",
      min: 1,
      max: 10,
      step: 1,
      _id: uuid(),
    },
  ],
  showIndex: true,
};

export default survey;
