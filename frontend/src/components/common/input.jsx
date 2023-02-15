export default function Input({
  name,
  label,
  type,
  value,
  onChange,
  error,
  inputStyle,
  errorStyle,
  labelStyle = "hidden",
}) {
  return (
    <>
      <label className={labelStyle} htmlFor={name}>
        {label}
      </label>
      <input
        className={inputStyle}
        id={name}
        name={name}
        type={type}
        placeholder={label}
        value={value}
        onChange={onChange}
      />
      {error && <p className={errorStyle}>{error}</p>}
    </>
  );
}
