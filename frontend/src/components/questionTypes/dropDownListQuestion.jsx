export default function DropDownListQuestion({ question, handleChange }) {
  const { options, _id } = question;

  return (
    <select
      className="w-full py-1 text-xl sm:text-2xl"
      defaultValue=""
      onChange={(e) => handleChange && handleChange(question, e.target.value)}
    >
      <option value="" disabled>
        Select your option
      </option>
      {options.map((o, i) => (
        <option key={`${_id} ${o} ${i}`} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
