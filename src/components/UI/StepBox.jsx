export default function StepBox({ number }) {
  return (
    <span
      className="inline-flex items-center justify-center w-12 h-12 rounded-lg font-bold text-xl flex-none
      bg-blue-100 text-blue-700"
    >
      {String(number).padStart(2, "0")}
    </span>
  );
}
