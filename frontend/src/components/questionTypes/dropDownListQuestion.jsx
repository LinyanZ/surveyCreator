export default function DropDownListQuestion({ question, handleChange }) {
  const { options, uuid } = question;

  return (
    <select
      className="px-4 py-1 text-2xl w-full"
      defaultValue=""
      onChange={(e) => handleChange && handleChange(question, e.target.value)}
    >
      <option value="" disabled>
        Select your option
      </option>
      {options.map((o) => (
        <option key={`${uuid} ${o}`} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
