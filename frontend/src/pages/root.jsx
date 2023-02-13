import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Survey from "../components/survey";
import { v4 as uuid } from "uuid";

const survey = [
  {
    type: "short answer",
    title: "This is a short answer question:",
    uuid: uuid(),
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
  },
  {
    type: "rating",
    title: "This is a rating question:",
    minLabel: "Min",
    maxLabel: "Max",
    min: 1,
    max: 5,
    step: 1,
    uuid: uuid(),
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
