const surveyTypes = [
  {
    type: "short answer",
    label: "Short Answer Question",
    default: {},
  },
  {
    type: "multiple choices single answer",
    label: "Multiple Choices Single Answer Question",
    default: {
      options: ["option 1", "option 2"],
    },
  },
  {
    type: "multiple choices multiple answers",
    label: "Multiple Choices Multiple Answers Question",
    default: {
      options: ["option 1", "option 2"],
    },
  },
  {
    type: "drop-down list",
    label: "Drop-down List Question",
    default: {
      options: ["option 1", "option 2"],
    },
  },
  {
    type: "rating",
    label: "Rating Question",
    default: {
      minLabel: "Min",
      maxLabel: "Max",
      min: 1,
      max: 5,
      step: 1,
    },
  },
];

export default surveyTypes;
