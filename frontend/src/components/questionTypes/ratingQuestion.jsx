import { useEffect, useState } from "react";

export default function RatingQuestion({ question, handleChange }) {
  const { minLabel, maxLabel, uuid } = question;
  const [ratings, setRatings] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    const min = Number(question.min);
    const max = Number(question.max);
    const step = Number(question.step);

    const newRatings = [];

    if (step * (max - min) > 0)
      for (
        let i = min;
        (step < 0 && i >= max) || (step > 0 && i <= max);
        i += step
      )
        newRatings.push(i);

    setRatings(newRatings);
  }, [question]);

  return (
    <div className="flex flex-wrap w-full text-xl sm:text-2xl gap-x-8 gap-y-2">
      <p>{minLabel}</p>
      {ratings.map((r) => (
        <button
          className={`w-10 h-10 ${
            selectedRating === r ? "bg-emerald-500 text-white" : ""
          }`}
          key={`${uuid} ${r}`}
          type="button"
          onClick={() => {
            handleChange && handleChange(question, r);
            setSelectedRating(r);
          }}
        >
          {r}
        </button>
      ))}
      <p>{maxLabel}</p>
    </div>
  );
}
