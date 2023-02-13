export default function ShortAnswerQuestion({ question, onChange }) {
  return (
    <input
      className="text-2xl px-4 py-2 w-full focus:outline-none border-b-2 border-transparent focus:border-neutral-200"
      type="text"
      placeholder="type you answer here"
      onChange={(e) => {
        onChange(question, e.target.value);
      }}
    />
  );
}
