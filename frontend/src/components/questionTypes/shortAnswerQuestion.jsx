export default function ShortAnswerQuestion({ question, handleChange }) {
  return (
    <input
      className="w-full py-2 mb-2 text-2xl border-b-2 border-transparent focus:outline-none focus:border-neutral-200"
      type="text"
      placeholder="type you answer here"
      onChange={(e) => {
        handleChange && handleChange(question, e.target.value);
      }}
    />
  );
}
