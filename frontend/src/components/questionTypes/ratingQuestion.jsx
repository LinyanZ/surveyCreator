import { useEffect, useState } from "react";

export default function RatingQuestion({ question, onChange }) {
  const { minLabel, maxLabel, min, max, step, uuid } = question;
  const [ratings, setRatings] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    const newRatings = [];
    for (let i = min; i <= max; i += step) {
      newRatings.push(i);
    }
    setRatings(newRatings);
  }, [min, max, step]);

  return (
    <div className="flex gap-8 px-4 text-2xl">
      <p>{minLabel}</p>
      {ratings.map((r) => (
        <button
          className={`w-10 h-10 ${
            selectedRating === r ? "bg-emerald-500 text-white" : ""
          }`}
          key={`${uuid} ${r}`}
          type="button"
          onClick={() => {
            onChange(question, r);
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
