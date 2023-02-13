import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Survey from "../components/survey";

const survey = [
  {
    type: "short answer",
    title: "This is a short answer question:",
  },
  {
    type: "single choice",
    title: "This is a single choice question:",
    options: ["option 1", "option 2", "option 3"],
  },
  {
    type: "multiple choices",
    title: "This is a multiple choices question:",
    options: ["option 1", "option 2", "option 3"],
  },
  {
    type: "drop down",
    title: "This is a drop down list question:",
    options: ["option 1", "option 2", "option 3"],
  },
  {
    type: "rating",
    title: "This is a rating question:",
    minLabel: "Min",
    maxLabel: "Max",
    min: 1,
    max: 5,
    step: 1,
  },
];

export default function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Survey survey={survey} showIndex={true} />
    </>
  );
}
