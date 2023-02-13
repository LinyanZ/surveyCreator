import { useEffect, useState } from "react";

export default function RatingQuestion({ question, index, showIndex }) {
  const { minLabel, maxLabel, min, max, step, title } = question;
  const [ratings, setRatings] = useState([]);

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
          <button key={`${title} ${r}`}>{r}</button>
        ))}
        <p>{maxLabel}</p>
      </div>
    </div>
  );
}
