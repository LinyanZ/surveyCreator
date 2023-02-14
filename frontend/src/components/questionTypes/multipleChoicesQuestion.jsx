import { useState } from "react";

export default function MultipleChoicesQuestion({ question, handleChange }) {
  const { options, uuid } = question;
  const [checkedOptions, setCheckedOptions] = useState(
    new Array(options.length).fill(false)
  );

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
            onChange={(e) => {
              const newCheckedOption = [...checkedOptions];
              newCheckedOption[index] = e.target.checked;
              setCheckedOptions(newCheckedOption);

              const answers = [];
              for (let i = 0; i < options.length; i++)
                if (newCheckedOption[i]) answers.push(options[i]);
              handleChange && handleChange(question, answers);
            }}
          />
          <label htmlFor={`${uuid} ${option}`}>{option}</label>
        </div>
      ))}
    </>
  );
}
