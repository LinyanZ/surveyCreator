const SurveyTypes = Object.freeze({
  ShortAnswer: "short answer",
  MultipleChoice: "multiple choice",
  MultipleAnswer: "multiple answer",
  DropdownList: "drop-down list",
  Rating: "rating",
});

const labels = Object.freeze({
  [SurveyTypes.ShortAnswer]: "Short Answer Question",
  [SurveyTypes.MultipleChoice]: "Multiple Choice Question",
  [SurveyTypes.MultipleAnswer]: "Multiple Answer Question",
  [SurveyTypes.DropdownList]: "Drop-down List Question",
  [SurveyTypes.Rating]: "Rating Question",
});

const defaultValues = Object.freeze({
  [SurveyTypes.ShortAnswer]: {},
  [SurveyTypes.MultipleChoice]: {
    options: ["option 1", "option 2"],
  },
  [SurveyTypes.MultipleAnswer]: {
    options: ["option 1", "option 2"],
  },
  [SurveyTypes.DropdownList]: {
    options: ["option 1", "option 2"],
  },
  [SurveyTypes.Rating]: {
    minLabel: "Min",
    maxLabel: "Max",
    min: 1,
    max: 5,
    step: 1,
  },
});

export { SurveyTypes, labels, defaultValues };
