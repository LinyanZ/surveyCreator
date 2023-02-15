import Input from "../common/input";

const inputStyle =
  "flex text-xl gap-x-8 my-2 flex-wrap w-full py-2 focus:outline-none border-b-2 border-neutral-300 focus:border-neutral-600";
const errorStyle = "text-red text-red-500";
const labelStyle = "text-xl";

export default function RatingQuestionEditor({ question }) {
  return (
    <div className="mt-4">
      <Input
        name="minLabel"
        label="Min Label"
        type="text"
        inputStyle={inputStyle}
        errorStyle={errorStyle}
        labelStyle={labelStyle}
        value={question.minLabel}
      />
      <Input
        name="maxLabel"
        label="Max Label"
        type="text"
        inputStyle={inputStyle}
        errorStyle={errorStyle}
        labelStyle={labelStyle}
        value={question.maxLabel}
      />
      <Input
        name="min"
        label="Min Value"
        type="number"
        inputStyle={inputStyle}
        errorStyle={errorStyle}
        labelStyle={labelStyle}
        value={question.min}
      />
      <Input
        name="max"
        label="Max Value"
        type="number"
        inputStyle={inputStyle}
        errorStyle={errorStyle}
        labelStyle={labelStyle}
        value={question.max}
      />
      <Input
        name="step"
        label="Step Value"
        type="number"
        inputStyle={inputStyle}
        errorStyle={errorStyle}
        labelStyle={labelStyle}
        value={question.step}
      />
    </div>
  );
}
