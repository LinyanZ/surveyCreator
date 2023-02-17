export default function SingleChoiceQuestion({ question, handleChange }) {
  const { options, _id } = question;

  return (
    <>
      {options?.map((option, i) => (
        <div
          key={`${_id} ${option} ${i}`}
          className="block py-1 text-xl sm:text-2xl"
        >
          <input
            className="mr-2"
            type="radio"
            id={`${_id} ${option}`}
            name={_id}
            value={`${_id} ${option}`}
            onChange={(e) => {
              handleChange && handleChange(question, e.target.value);
            }}
          />
          <label htmlFor={`${_id} ${option}`}>{option}</label>
        </div>
      ))}
    </>
  );
}
