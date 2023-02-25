export default function ErrorScreen({ message }) {
  return (
    <div className="w-full h-[calc(100vh-92px)] flex items-center justify-center flex-col">
      <p className="text-3xl text-neutural-500">Eh, here is an error:</p>
      <p className="text-3xl text-neutural-500">{message}</p>
    </div>
  );
}
