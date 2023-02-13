import { useState } from "react";

export default function MultipleChoicesQuestion({ question, onChange }) {
  const { options, uuid } = question;
  const [checkedOptions, setCheckedOptions] = useState(
    new Array(options.length).fill(false)
  );

  const handleChange = (e, index) => {
    const newCheckedOption = [...checkedOptions];
    newCheckedOption[index] = e.target.checked;
    setCheckedOptions(newCheckedOption);

    const answers = [];
    for (let i = 0; i < options.length; i++)
      if (newCheckedOption[i]) answers.push(options[i]);
    onChange(question, answers);
  };

  return (
    <>
      {options.map((option, index) => (
        <div key={`${uuid} ${option}`} className="block px-4 py-1 text-2xl">
          <input
            className="mr-2"
            type="checkbox"
            id={`${uuid} ${option}`}
            name={uuid}
            value={`${uuid} ${option}`}
            onChange={(e) => handleChange(e, index)}
          />
          <label htmlFor={`${uuid} ${option}`}>{option}</label>
        </div>
      ))}
    </>
  );
}
