function CheckboxInput({ title, option }) {
  return (
    <div className="block px-4 py-1 text-2xl">
      <input
        className="mr-2"
        type="checkbox"
        id={`${title} ${option}`}
        name={title}
        value={`${title} ${option}`}
      />
      <label htmlFor={`${title} ${option}`}>{option}</label>
    </div>
  );
}

export default function MultipleChoicesQuestion({
  question,
  index,
  showIndex = true,
}) {
  const { title, options } = question;

  return (
    <form className="w-full my-8">
      <h3 className="text-2xl px-4 py-2 w-full font-bold">
        {showIndex ? `${index}. ${title}` : title}
      </h3>
      {options.map((o) => (
        <CheckboxInput key={`${title} ${o}`} title={title} option={o} />
      ))}
    </form>
  );
}
