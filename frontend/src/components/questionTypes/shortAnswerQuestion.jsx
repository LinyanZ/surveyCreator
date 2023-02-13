export default function ShortAnswerQuestion({
  question,
  index,
  showIndex = true,
}) {
  const { title } = question;

  return (
    <form className="w-full my-8">
      <h3 className="text-2xl px-4 py-2 w-full font-bold">
        {showIndex ? `${index}. ${title}` : title}
      </h3>
      <input
        className="text-2xl px-4 py-2 w-full focus:outline-none border-b-2 border-transparent focus:border-neutral-200"
        type="text"
        placeholder="type you answer here"
      />
    </form>
  );
}
