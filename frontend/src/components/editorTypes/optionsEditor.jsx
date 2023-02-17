import Input from "../common/input";

export default function OptionsEditor({ question, handleChange, error }) {
  return (
    <div>
      <p className="my-4 text-xl font-bold">Options</p>
      {question.options.map((o, i) => (
        <div className="flex flex-wrap gap-x-4 my-2 text-xl" key={i}>
          <Input
            value={o}
            onChange={(e) => {
              const update = { ...question };
              update.options[i] = e.target.value;
              handleChange(question._id, update);
            }}
            inputStyle="flex-grow text-xl my-2"
          />
          <button
            className="w-10 h-10 flex justify-center items-center my-2 text-white transition bg-red-500 rounded-md hover:bg-red-400"
            type="button"
            onClick={() => {
              const update = { ...question };
              update.options.splice(i, 1);
              handleChange(question._id, update);
            }}
          >
            -
          </button>
        </div>
      ))}
      <button
        className="w-10 h-10 mt-4 flex justify-center items-center ml-auto text-xl text-white transition rounded-md bg-emerald-500 hover:bg-emerald-400"
        type="button"
        onClick={() => {
          const update = { ...question };
          update.options.push("new option");
          handleChange(question._id, update);
        }}
      >
        +
      </button>
      {error?.options && (
        <p className="text-lg sm:text-xl text-red my-2 text-red-500">
          {error.options}
        </p>
      )}
    </div>
  );
}
