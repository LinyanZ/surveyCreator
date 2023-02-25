import { useState } from "react";

export default function MultipleChoicesQuestion({ question, handleChange }) {
  const { options, _id } = question;
  const [checkedOptions, setCheckedOptions] = useState(
    new Array(options.length).fill(false)
  );

  return (
    <>
      {options.map((option, index) => (
        <div
          key={`${_id} ${option} ${index}`}
          className="block py-1 text-xl sm:text-2xl"
        >
          <input
            className="mr-2"
            type="checkbox"
            id={`${_id} ${index} ${option}`}
            name={_id}
            value={option}
            onChange={(e) => {
              if (handleChange) {
                const newCheckedOption = [...checkedOptions];
                newCheckedOption[index] = e.target.checked;
                setCheckedOptions(newCheckedOption);

                const answers = [];
                for (let i = 0; i < options.length; i++)
                  if (newCheckedOption[i]) answers.push(options[i]);
                handleChange(question, answers);
              }
            }}
          />
          <label htmlFor={`${_id} ${index} ${option}`}>{option}</label>
        </div>
      ))}
    </>
  );
}
