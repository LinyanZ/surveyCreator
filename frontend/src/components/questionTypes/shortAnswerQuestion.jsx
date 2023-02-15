export default function ShortAnswerQuestion({ question, handleChange }) {
  return (
    <input
      className="text-2xl py-2 mb-2 w-full focus:outline-none border-b-2 border-transparent focus:border-neutral-200"
      type="text"
      placeholder="type you answer here"
      onChange={(e) => {
        handleChange && handleChange(question, e.target.value);
      }}
    />
  );
}
