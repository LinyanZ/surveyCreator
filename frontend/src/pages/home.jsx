import { Link } from "react-router-dom";
import survey from "../survey";

const surveys = Array(10).fill(survey);

export default function Home() {
  return (
    <div className="max-w-screen-lg mx-auto p-8">
      {surveys.map((s, i) => (
        <Link
          key={i}
          className="block my-8 w-full shadow-[0px_0px_20px_2px_rgba(0,0,0,0.05)] p-8 text-3xl"
          to="survey"
        >
          {s.title}
        </Link>
      ))}
    </div>
  );
}
