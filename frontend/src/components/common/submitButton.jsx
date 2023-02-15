export default function SubmitButton({ ...props }) {
  return (
    <button
      className="block w-full p-4 my-8 text-2xl text-white transition-colors border rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-neutral-400"
      type="submit"
      {...props}
    />
  );
}
