export default function SubmitButton({ label, ...props }) {
  return (
    <button
      className="block text-2xl w-full my-8 border rounded-xl p-4 bg-emerald-500 text-white hover:bg-emerald-400 transition-colors disabled:bg-neutral-400"
      type="submit"
      {...props}
    >
      {label}
    </button>
  );
}
