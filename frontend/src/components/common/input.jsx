export default function Input({ name, label, type, value, onChange, error }) {
  return (
    <>
      <label className="hidden" htmlFor={name}>
        {label}
      </label>
      <input
        className="block text-xl w-full my-4 border rounded-xl p-4 focus:outline-neutral-200"
        id={name}
        name={name}
        type={type}
        placeholder={label}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red mx-4 mt-2 text-red-500">{error}</p>}
    </>
  );
}
