export default function SingleChoiceQuestion({ question, handleChange }) {
  const { options, uuid } = question;

  return (
    <>
      {options?.map((option) => (
        <div key={`${uuid} ${option}`} className="block py-1 text-2xl">
          <input
            className="mr-2"
            type="radio"
            id={`${uuid} ${option}`}
            name={uuid}
            value={`${uuid} ${option}`}
            onChange={(e) => {
              handleChange && handleChange(question, e.target.value);
            }}
          />
          <label htmlFor={`${uuid} ${option}`}>{option}</label>
        </div>
      ))}
    </>
  );
}
