export default function SingleChoiceQuestion({
  question,
  index,
  showIndex = true,
  onChange,
}) {
  const { title, options, uuid } = question;

  return (
    <form className="w-full my-8">
      <h3 className="text-2xl px-4 py-2 w-full font-bold">
        {showIndex ? `${index}. ${title}` : title}
      </h3>
      {options.map((option) => (
        <div key={`${uuid} ${option}`} className="block px-4 py-1 text-2xl">
          <input
            className="mr-2"
            type="radio"
            id={`${uuid} ${option}`}
            name={uuid}
            value={`${uuid} ${option}`}
            onChange={(e) => {
              onChange(uuid, option);
            }}
          />
          <label htmlFor={`${uuid} ${option}`}>{option}</label>
        </div>
      ))}
    </form>
  );
}
