import { v4 as uuid } from "uuid";

const survey = {
  title: "Survey Title",
  description: "Survey Description",
  questions: [
    {
      type: "short answer",
      title: "This is a short answer question:",
      uuid: uuid(),
      isRequired: true,
    },
    {
      type: "single choice",
      title: "This is a single choice question:",
      options: ["option 1", "option 2", "option 3"],
      uuid: uuid(),
    },
    {
      type: "multiple choices",
      title: "This is a multiple choices question:",
      options: ["option 1", "option 2", "option 3"],
      uuid: uuid(),
    },
    {
      type: "drop down",
      title: "This is a drop down list question:",
      options: ["option 1", "option 2", "option 3"],
      uuid: uuid(),
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
      uuid: uuid(),
    },
  ],
  showIndex: true,
};

export default survey;
