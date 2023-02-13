export default function DropDownListQuestion({
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
      <select className="px-4 py-1 text-2xl">
        {options.map((o) => (
          <option key={`${title} ${o}`} value={o}>
            {o}
          </option>
        ))}
      </select>
    </form>
  );
}
