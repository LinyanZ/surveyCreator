import Input from "../common/input";

const inputStyle =
  "flex text-xl gap-x-8 my-2 flex-wrap w-full py-2 focus:outline-none border-b-2 border-neutral-300 focus:border-neutral-600";
const errorStyle = "text-lg sm:text-xl text-red my-2 text-red-500";
const labelStyle = "text-xl font-bold";

export default function RatingQuestionEditor({
  question,
  handleChange,
  error,
}) {
  return (
    <div className="mt-4">
      <Input
        name="minLabel"
        label="Min Label"
        type="text"
        inputStyle={inputStyle}
        error={error?.minLabel}
        errorStyle={errorStyle}
        labelStyle={labelStyle}
        value={question.minLabel}
        onChange={(e) => {
          handleChange(question.uuid, {
            ...question,
            minLabel: e.target.value,
          });
        }}
      />
      <Input
        name="maxLabel"
        label="Max Label"
        type="text"
        inputStyle={inputStyle}
        error={error?.maxLabel}
        errorStyle={errorStyle}
        labelStyle={labelStyle}
        value={question.maxLabel}
        onChange={(e) => {
          handleChange(question.uuid, {
            ...question,
            maxLabel: e.target.value,
          });
        }}
      />
      <Input
        name="min"
        label="Min Value"
        type="number"
        inputStyle={inputStyle}
        error={error?.min}
        errorStyle={errorStyle}
        labelStyle={labelStyle}
        value={question.min}
        onChange={(e) => {
          handleChange(question.uuid, {
            ...question,
            min: Number(e.target.value),
          });
        }}
      />
      <Input
        name="max"
        label="Max Value"
        type="number"
        inputStyle={inputStyle}
        error={error?.max}
        errorStyle={errorStyle}
        labelStyle={labelStyle}
        value={question.max}
        onChange={(e) => {
          handleChange(question.uuid, {
            ...question,
            max: Number(e.target.value),
          });
        }}
      />
      <Input
        name="step"
        label="Step Value"
        type="number"
        inputStyle={inputStyle}
        error={error?.step}
        errorStyle={errorStyle}
        labelStyle={labelStyle}
        value={question.step}
        onChange={(e) => {
          handleChange(question.uuid, {
            ...question,
            step: Number(e.target.value),
          });
        }}
      />
    </div>
  );
}
