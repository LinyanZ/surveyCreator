import Input from "../common/input";

export default function OptionsEditor({ question, handleChange }) {
  return (
    <div>
      <p className="my-4 text-xl font-bold">Options</p>
      {question.options.map((o, i) => (
        <div className="flex flex-wrap my-2 text-xl" key={i}>
          <Input
            value={o}
            onChange={(e) => {
              const update = { ...question };
              update.options[i] = e.target.value;
              handleChange(question.uuid, update);
            }}
            inputStyle="flex-grow text-xl"
          />
          <button
            className="w-32 h-10 text-white transition bg-red-500 rounded-md hover:bg-red-400"
            type="button"
            onClick={() => {
              const update = { ...question };
              update.options.splice(i, 1);
              handleChange(question.uuid, update);
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        className="block w-32 h-10 ml-auto text-xl text-white transition rounded-md bg-emerald-500 hover:bg-emerald-400"
        type="button"
        onClick={() => {
          const update = { ...question };
          update.options.push("new option");
          handleChange(question.uuid, update);
        }}
      >
        Add
      </button>
    </div>
  );
}
