import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getSubmissionsById } from "../api/submissions";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { SurveyTypes } from "../surveyTypes";
import { useState } from "react";

const Submission = ({ record }) => {
  const [chartType, setChartType] = useState("barChart");

  const formatData = (question) => {
    const formatted = {};

    if (
      question.type === SurveyTypes.MultipleChoice ||
      question.type === SurveyTypes.DropdownList ||
      question.type === SurveyTypes.Rating
    ) {
      for (const r of question.responses)
        formatted[r] = formatted[r] !== undefined ? formatted[r] + 1 : 1;
    } else if (question.type === SurveyTypes.MultipleAnswer) {
      for (const answers of question.responses)
        for (const a of answers)
          formatted[a] = formatted[a] !== undefined ? formatted[a] + 1 : 1;
    }

    return Object.entries(formatted).map((arr) => ({
      option: arr[0],
      count: arr[1],
    }));
  };

  return (
    <div className="relative py-2 my-4">
      <h3 className="w-full text-xl font-bold sm:text-2xl">{record.title}</h3>
      {record.type !== SurveyTypes.ShortAnswer && (
        <button
          className="absolute right-0 top-2 text-xl sm:text-2xl h-8 w-8"
          onClick={() =>
            setChartType(chartType === "barChart" ? "radarChart" : "barChart")
          }
        >
          {chartType === "barChart" ? (
            <img src="/icons/hexagon.svg" />
          ) : (
            <img src="/icons/bar-chart.svg" />
          )}
        </button>
      )}
      <div className="w-full h-[500px] my-8">
        {record.type === SurveyTypes.ShortAnswer ? (
          <ul className="h-full overflow-auto text-lg sm:text-xl">
            {record.responses.map((r, i) => (
              <li key={`${record.qid} ${i}`}>{r}</li>
            ))}
          </ul>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "barChart" ? (
              <BarChart data={formatData(record)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="option" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            ) : (
              <RadarChart data={formatData(record)}>
                <PolarGrid />
                <PolarAngleAxis dataKey="option" />
                <Tooltip />
                <Radar
                  dataKey="count"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            )}
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default function SurveySubmissions() {
  const { id } = useParams();
  const { isLoading, isError, data, error } = useQuery(
    ["survey", id, "submissions"],
    () => getSubmissionsById(id)
  );

  const submissions = data?.data;

  if (isError) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-screen-lg mx-auto my-8 px-8">
      {submissions?.map((record, i) => (
        <Submission record={record} key={i} />
      ))}
    </div>
  );
}
