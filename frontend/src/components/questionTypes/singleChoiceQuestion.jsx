export default function SingleChoiceQuestion({ question, onChange }) {
  const { options, uuid } = question;

  return (
    <>
      {options.map((option) => (
        <div key={`${uuid} ${option}`} className="block px-4 py-1 text-2xl">
          <input
            className="mr-2"
            type="radio"
            id={`${uuid} ${option}`}
            name={uuid}
            value={`${uuid} ${option}`}
            onChange={(e) => {
              onChange(question, option);
            }}
          />
          <label htmlFor={`${uuid} ${option}`}>{option}</label>
        </div>
      ))}
    </>
  );
}
