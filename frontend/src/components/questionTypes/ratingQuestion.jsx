import { useEffect, useState } from "react";

export default function RatingQuestion({
  question,
  index,
  showIndex,
  onChange,
}) {
  const { minLabel, maxLabel, min, max, step, title, uuid } = question;
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
    <div className="w-full my-8">
      <h3 className="text-2xl px-4 py-2 w-full font-bold">
        {showIndex ? `${index}. ${title}` : title}
      </h3>
      <div className="flex gap-8 px-4 text-2xl">
        <p>{minLabel}</p>
        {ratings.map((r) => (
          <button
            className={`w-10 h-10 ${
              selectedRating === r ? "bg-emerald-500 text-white" : ""
            }`}
            key={`${uuid} ${r}`}
            onClick={() => {
              onChange(uuid, r);
              setSelectedRating(r);
            }}
          >
            {r}
          </button>
        ))}
        <p>{maxLabel}</p>
      </div>
    </div>
  );
}
